#!/usr/bin/env python
# coding: utf-8

import web
import random
import time, datetime
from hashlib import md5
from config import view, site_name
from app.common import session , email_templates
#from app.common.utils import sort_dict_by_multi_key
from app.models import users, image, admin, postModel, nodeModel, notification
from app.common.misc import filter_tags

siteName = site_name
user = session.get_session()

class index:
    def GET(self):
        # foo = web.cookies(cookieName=defaultValue)
        # foo.age
        #if user.is_logged:
        if True: # 全部开放
            rec_posts = admin.get_rec_posts()
            postList = []
            # if len(rec_posts) > 20:
            #     map(lambda x:postList.extend(postModel.getPostsByPostId(x.pid)), rec_posts)
            # else:
            #     postList = list(postModel.getRecent20Posts())
            map(lambda x:postList.extend(postModel.getPostsByPostId(x.pid)), rec_posts)

            #postList = sort_dict_by_multi_key(postList, ['magnitude', 'creation_ts'], reverse=True)
            #postList = sorted(postList, key=lambda x:x.creation_ts, reverse=True)
                

            authors = []
            map(lambda x:authors.extend(users.get_users_by_id(x)), [x.postAuthor for x in postList])

            nodes = []
            map(lambda x:nodes.extend(nodeModel.getNodesByNodeId(x)), [x.nodeId for x in postList])

            if user.is_logged:
                rights = users.get_permission_by_douid(user.douban_id)[0].rights

                if users.is_user_exist_in_apply_log(user.douban_id): #如果申请记录表中有此用户记录：
                    apply_log = users.get_log_result(user.douban_id)
                else:
                    apply_log = {}

                #得到提醒
                notification_results, notification_num = notification.get_unread_notification(user.id)
                #得到@提醒
                notification_mention_results, mention_num= notification.get_unread_metion_notifition(user.id)
                #链表 得到提醒的详细id\名称等
                ntf_posts = []
                ntf_users = []
                mtf_posts = []
                mtf_users = []

                ntf_list = notification_results.list()
                mtf_list = notification_mention_results.list()
                for notify in ntf_list:
                    ntf_posts.extend(postModel.getPostsByPostId(notify.pid))
                    ntf_users.extend(users.get_users_by_id(notify.uid))

                for notify in mtf_list:
                    mtf_posts.extend(postModel.getPostsByPostId(notify.pid))
                    mtf_users.extend(users.get_users_by_id(notify.uid))

                ntf_list = ntf_list + mtf_list
                ntf_posts = ntf_posts + mtf_posts
                ntf_users = ntf_users + mtf_users
                notification_num = notification_num+mention_num
            else:
                rights = None
                apply_log = None
                ntf_list = None
                notification_num = None
                ntf_posts = None
                ntf_users = None

            return view.base(view.recommend_posts(postList, authors, nodes, user, rights, apply_log, filter_tags), user, siteName, rights, ntf_list, notification_num, ntf_posts, ntf_users)

        else:
            from config import db
            #得到上线时间距今多少天
            t = time.strptime('2013-03-15 02:15:57', "%Y-%m-%d %X")
            ts = datetime.datetime(* t[:6])
            delta = (datetime.datetime.now() - ts).days 

            #得到用户数
            user_count = int(db.select('users', what='count(distinct id) as c')[0].c)
            #得到话题数
            node_count = int(db.select('_node', what='count(distinct id) as c')[0].c)
            #得到片段数
            post_count = int(db.select('_post', what='count(distinct id) as c')[0].c)
            #得到喜欢数
            vote_count = int(db.select('_post_vote_user', what='count(distinct id) as c')[0].c)
            #得到评论数
            comm_count = int(db.select('_post_comments', what='count(distinct id) as c')[0].c)

            r = str(random.randint(1, 17))

            return view.base01(view.landing(r, delta, user_count, node_count, post_count, vote_count, comm_count), siteName)
            
    def POST(self):
        f = web.input(regNickname="", regUserName="", regEmail="", regUserPassword="", regUserPassword2="")
        users.create_account(f.regUserName, f.regEmail, f.regUserPassword, f.regNickname) #用户表入库
        token = md5.md5(time.ctime() + f.regEmail).hexdigest()
        email_templates.create_account(f.regEmail, token)
        users.save_confirm_email(f.regEmail, token)
        session.login(f.regEmail)
        raise web.seeother('/')
        #return view.base01(view.test(f.regEmail, token), siteName)

class explore:
    def GET(self):
        last_users = users.last_users().list()
        last_image = image.get_last_image().list()

        #得到最新图片的上传者ID
        authorsID = []
        for u in last_image:
            authorsID += str(u.userID).split()

        #根据ID去用户表查找
        authors = []
        for i in xrange(len(authorsID)):
            authors += users.get_users_by_id(authorsID[i])

        #得到最新图片ID
        # img_ids = []
        # for i in last_image:
        #     img_ids += str(i.id).split()

        #得到最新图片的被喜欢数
        # count = []
        # for i in xrange(len(img_ids)):
        #     count += str(image.GetFavUserCount(img_ids[i]))

        return view.base03(view.explore(last_users, last_image, authors), user, siteName, 2)

class rec_node:
    def GET(self):
        rec_nodes = admin.get_rec_nodes()

        nodeList = []
        
        for node in rec_nodes:
            nodeList.extend(nodeModel.getNodesByNodeId(node.nid))

        authors = []
        for node in nodeList:
            authors.extend(users.get_users_by_id(node.node_author))

        #得到最新的那个post
        lastest_posts = []
        for node in nodeList:
            recent_post_in_node = postModel.getRecentOnePostsInNode(node.id)
            if recent_post_in_node:
                lastest_posts.extend(recent_post_in_node.creation_ts.timetuple())

        #得到当前用户的权限
        if user.is_logged:
            per = users.get_permission_by_douid(user.douban_id)
            rights = per[0].rights

            if users.is_user_exist_in_apply_log(user.douban_id): #如果申请记录表中有此用户记录：
                apply_log = users.get_log_result(user.douban_id)
            else:
                apply_log = {}

            #得到提醒
            notification_results, notification_num = notification.get_unread_notification(user.id)
            #得到@提醒
            notification_mention_results, mention_num= notification.get_unread_metion_notifition(user.id)
            #链表 得到提醒的详细id\名称等
            ntf_posts = []
            ntf_users = []
            mtf_posts = []
            mtf_users = []

            ntf_list = notification_results.list()
            mtf_list = notification_mention_results.list()
            for notify in ntf_list:
                ntf_posts.extend(postModel.getPostsByPostId(notify.pid))
                ntf_users.extend(users.get_users_by_id(notify.uid))

            for notify in mtf_list:
                mtf_posts.extend(postModel.getPostsByPostId(notify.pid))
                mtf_users.extend(users.get_users_by_id(notify.uid))

            ntf_list = ntf_list + mtf_list
            ntf_posts = ntf_posts + mtf_posts
            ntf_users = ntf_users + mtf_users
            notification_num = notification_num+mention_num
        else:
            rights = None
            notification_results = None
            notification_num = None
            ntf_list = None
            ntf_posts = None
            ntf_users = None
            apply_log = {}
        return view.base(view.recommend_nodes(nodeList, authors, user, rights, apply_log, lastest_posts, datetime), user, siteName, rights, ntf_list, notification_num, ntf_posts, ntf_users)
