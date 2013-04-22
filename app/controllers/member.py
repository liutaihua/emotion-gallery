#!/usr/bin/env python
# coding: utf-8

import re
import web
import time
import datetime

from config import view, site_name
from app.common import session
from app.common.misc import replace_breaks
from app.models import users, postModel, nodeModel, notification

siteName = site_name
user = session.get_session()


class member_home:
    def GET(self, username, p=1):
        u = users.get_user_by_username(username)
        if u:
            page = int(p)
            perpage = 5
            offset = (page - 1) * perpage

            created_posts = postModel.getCreatedPostsByUserId(u.id, offset, perpage).list()
            nodes = []
            for i in xrange(len(created_posts)):
                nodes += nodeModel.getNodesByNodeId(created_posts[i].nodeId)
            #得到资料
            profile = users.get_profile_by_user_id(u.id)
            #note 跳转到豆瓣
            # raise web.seeother('http://www.douban.com/people/'+ username)
            

            # pf = users.get_profile_by_user_id(u.id)
            # #得到上传的图片数
            # results,num_results = image.query(u.id)
            # #得到喜欢的图片数
            # fav_count = image.GetUserFavCount(u.id)

            # #得到用户上传的图片路径
            # imagePath = image.get_paths_by_id(u.id).list()
            # paths = []
            # for p in imagePath:
            #     paths += p.path.split()
            # #得到图片id
            # imageIDs = image.get_imageID_by_id(u.id).list()
            # img_ids = []
            # for i in imageIDs:
            #     img_ids += str(i.id).split()
            # return view.base(view.member_home(u, pf, paths, img_ids, num_results, fav_count), user, siteName)

            #是否登录，
            if user.is_logged:
                per = users.get_permission_by_douid(user.douban_id)
                rights = per[0].rights
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
                for x in xrange(len(ntf_list)):
                    ntf_posts += postModel.getPostsByPostId(ntf_list[x].pid)
                    ntf_users += users.get_users_by_id(ntf_list[x].uid)

                for x in xrange(len(mtf_list)):
                    mtf_posts += postModel.getPostsByPostId(mtf_list[x].pid)
                    mtf_users += users.get_users_by_id(mtf_list[x].uid)

                ntf_list = ntf_list + mtf_list
                ntf_posts = ntf_posts + mtf_posts
                ntf_users = ntf_users + mtf_users
                notification_num = notification_num+mention_num

            else:
                rights = 0
                is_voted = None
                notification_results = None
                notification_num = None
                ntf_list = None
                ntf_posts = None
                ntf_users = None
            return view.base(view.member_home(u, profile, created_posts, nodes, user, replace_breaks), user, siteName, rights, ntf_list, notification_num, ntf_posts, ntf_users)
        else:
            raise web.notfound()

class member_home_post_load_more:
    def GET(self, username, page_num):
        u = users.get_user_by_username(username)
        page = int(page_num)
        perpage = 5
        offset = (page - 1) * perpage

        # url = web.ctx.get('path')
        # if int(url.count('recent')) == 0:
        created_posts = postModel.getCreatedPostsByUserId(u.id, offset, perpage).list()

        nodes = []
        for i in xrange(len(created_posts)):
            nodes += nodeModel.getNodesByNodeId(created_posts[i].nodeId)

        return view.post_list_member_profile_more(u, created_posts, nodes)
        

# class member_favorite:
#     def GET(self,username):
#         u = users.get_user_by_username(username)
#         pf = users.get_profile_by_user_id(u.id)
#         #得到用户上传的图片数
#         results,num_results = image.query(u.id)
#         #得到用户喜欢的图片数
#         fav_count = image.GetUserFavCount(u.id)

#         #得到用户喜欢的图片
#         fav_imgs = image.GetFavImageByUserId(u.id).list()

#         #得到用户喜欢的图片id
#         fav_img_ids = []
#         for i in fav_imgs:
#             fav_img_ids += str(i.img_id).split()

#         #根据ID去得到图片
#         images = []
#         for i in xrange(len(fav_img_ids)):
#             images += image.get_imgs_by_imgid(fav_img_ids[i])

#         #根据图片中的userID得到图片的上传者昵称
#         authors = []
#         for i in xrange(len(images)):
#             authors += users.get_users_by_id(images[i].userID)

#         return view.base(view.member_favorite(u, pf, num_results, fav_count, images, authors), user, siteName)

class member_node:
    def GET(self, username, p=1):
        u = users.get_user_by_username(username)
        profile = users.get_profile_by_user_id(u.id)

        page = int(p)
        perpage = 10
        offset = (page - 1) * perpage

        nodeList = nodeModel.getCreatedNodesByUserId(u.id, offset, perpage).list()

        #是否登录，
        if user.is_logged:
            per = users.get_permission_by_douid(user.douban_id)
            rights = per[0].rights
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
            for x in xrange(len(ntf_list)):
                ntf_posts += postModel.getPostsByPostId(ntf_list[x].pid)
                ntf_users += users.get_users_by_id(ntf_list[x].uid)

            for x in xrange(len(mtf_list)):
                mtf_posts += postModel.getPostsByPostId(mtf_list[x].pid)
                mtf_users += users.get_users_by_id(mtf_list[x].uid)

            ntf_list = ntf_list + mtf_list
            ntf_posts = ntf_posts + mtf_posts
            ntf_users = ntf_users + mtf_users
            notification_num = notification_num+mention_num

        else:
            rights = 0
            is_voted = None
            notification_results = None
            notification_num = None
            ntf_list = None
            ntf_posts = None
            ntf_users = None

        return view.base(view.member_node(u, profile, nodeList),user, siteName, rights, ntf_list, notification_num, ntf_posts, ntf_users)
        
class member_home_node_load_more:
    def GET(self, username, page_num):
        u = users.get_user_by_username(username)
        page = int(page_num)
        perpage = 10
        offset = (page - 1) * perpage

        nodeList = nodeModel.getCreatedNodesByUserId(u.id, offset, perpage).list()

        return view.node_list_member_profile_more(u, nodeList)
        
class contributed_node:
    def GET(self, username, p=1):
        u = users.get_user_by_username(username)
        profile = users.get_profile_by_user_id(u.id)

        page = int(p)
        perpage = 10
        offset = (page - 1) * perpage

        posts = postModel.groupGetCreatedPostsByUserId(u.id, offset, perpage).list()
        nodeids = []
        for i in xrange(len(posts)):
            nodeids += str(posts[i].nodeId).split()

        nodeList = []
        for i in xrange(len(nodeids)):
            nodeList += nodeModel.getNodesByNodeId(nodeids[i])

        authors = []
        for i in xrange(len(nodeList)):
            authors += users.get_users_by_id(nodeList[i].node_author)

        #是否登录，
        if user.is_logged:
            per = users.get_permission_by_douid(user.douban_id)
            rights = per[0].rights
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
            for x in xrange(len(ntf_list)):
                ntf_posts += postModel.getPostsByPostId(ntf_list[x].pid)
                ntf_users += users.get_users_by_id(ntf_list[x].uid)

            for x in xrange(len(mtf_list)):
                mtf_posts += postModel.getPostsByPostId(mtf_list[x].pid)
                mtf_users += users.get_users_by_id(mtf_list[x].uid)

            ntf_list = ntf_list + mtf_list
            ntf_posts = ntf_posts + mtf_posts
            ntf_users = ntf_users + mtf_users
            notification_num = notification_num+mention_num

        else:
            rights = 0
            is_voted = None
            notification_results = None
            notification_num = None
            ntf_list = None
            ntf_posts = None
            ntf_users = None

        return view.base(view.member_node_contributed(u, profile, nodeList, authors),user, siteName, rights, ntf_list, notification_num, ntf_posts, ntf_users)

class contributed_node_more:
    def GET(self, username, page_num):
        u = users.get_user_by_username(username)
        page = int(page_num)
        perpage = 10
        offset = (page - 1) * perpage

        posts = postModel.groupGetCreatedPostsByUserId(u.id, offset, perpage).list()
        nodeids = []
        for i in xrange(len(posts)):
            nodeids += str(posts[i].nodeId).split()

        nodeList = []
        for i in xrange(len(nodeids)):
            nodeList += nodeModel.getNodesByNodeId(nodeids[i])

        authors = []
        for i in xrange(len(nodeList)):
            authors += users.get_users_by_id(nodeList[i].node_author)

        return view.node_list_contributed_more(nodeList, authors)
    
