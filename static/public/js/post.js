jQuery(function () {
    // jQuery(h1).hallo({
    //     plugins: {
    //       'halloformat': {},
    //       'halloblock': {},
    //       'hallojustify': {},
    //       'hallolists': {},
    //       'halloreundo': {}
    //     }
    // });

    //得到屏幕的高度
    var win_h = jQuery(window).height();
    
//---------------------------------
//-------------切换tab-------------
//---------------------------------
jQuery('.switch_tab').live('click',function(){
    //slide 高度
    jQuery('.wide_fix').slideDown(100)
    jQuery(this).remove()
})

//---------------------------------
//-------------切换模板-------------
//---------------------------------
    jQuery('.post_template_switch_tab .nav-tabs li > a').click(function(){
        var l = jQuery(this).attr('data-toggle'),
            l = l.substr(l.length-1,1);

        //给body增加相应的模板class
        jQuery('body').attr('class', '')
        jQuery('body').addClass('new_post_template_' + l)

        //tab当前项
        jQuery('.post_template_switch_tab .nav-tabs li').removeClass('active')
        jQuery(this).parents('li').eq(0).addClass('active')

        //移除之前增加的模板css文件
        jQuery("head").children("link:last").remove()

        //添加相应的新模板css文件 //模板css中的图片容器是原始的大小值/初始值
        jQuery("head").append("<link>");
        css = jQuery("head").children(":last");
        css.attr({
            id : 'template_' + l,
            rel: "stylesheet",
            type: "text/css",
            href: "/static/public/css/new_post_template_" + l +".css"
        });

        //把切换后的模板赋值给input
        jQuery('#tempID').val(l)

        var c = jQuery('body').attr('class');

        //slide 高度
        jQuery('.wide_fix').slideUp(100).before('<div class="switch_tab"><i class="icon-align-justify icon icon-white"></i></div>')

        // 判断 图片为拖拽上传并且有图(图片未被删除)
        if (jQuery('.imageHolder').size() > 0 && jQuery(".imageHolder").css("background-image") != 'none'){
            var path = jQuery(".imageHolder").css("background-image");
                path = path.replace(/"/g,"").replace(/url\(|\)$/ig, "");
                // http://0.0.0.0:8080/static/upload/post_img/2012/11/9/201211953523_4275cdf0357c5063d5580fa9b8204412_1200.jpg
                h = path.split("/", 3).join("/");
                // http://0.0.0.0:8080
                d = path.replace(h, "");
                // /static/upload/post_img/2012/11/9/201211953523_4275cdf0357c5063d5580fa9b8204412_1200.jpg
                p = d.split('_')[0] + "_" + d.split('_')[1] + "_" + d.split('_')[2];
                
                p_450_max = p+'_450-max.jpg'
                p_1200 = p+'_1200.jpg'
                p_1201_max = p+'_1201-max.jpg'

                //-----------
                // 以上为重新组织后的图片地址，最终的结果以及用途分别为：
                //-----------
                // 1. p_1200 模板1用：抠图（取中间）裁剪后的1200*550
                // /static/upload/post_img/2012/11/9/201211953523_4275cdf0357c5063d5580fa9b8204412_1200.jpg
                //-----------
                // 2. p_450-max 模板2用：450等比缩放的缩略图
                // /static/upload/post_img/2012/11/9/201211953523_4275cdf0357c5063d5580fa9b8204412_450-max.jpg
                //-----------
                // 3. p_1200-max 模板3、4用：1200等比缩放的缩略图
                // /static/upload/post_img/2012/11/9/201211953523_4275cdf0357c5063d5580fa9b8204412_1200-max.jpg

                //创建图片，用来得到 p_450_max 的高度和宽度
                img450 = new Image()
                img450.src = p_450_max

            //因为上面的new Image()可能速度较慢，所以在接下来的获得img450的宽度和高度时先延迟一段时间(150)，不然获得的值为0
            setTimeout(function(){
                //判断如果是模板1
                if (c == 'new_post_template_1'){
                    //恢复模板1图片上传容器的原始大小，更新容器中的图片
                    jQuery('.post_image_upload_wrap').css({
                        'height': '480px',
                        'width': 'auto'
                    })
                    jQuery('.imageHolder').css({
                        'background-size':'cover',
                        'background-image': 'url(' + p_1200 +')'
                    })
                    //赋值给隐藏的input
                    jQuery('#post_Img_1').val(p_1200)
                //判断如果是模板2
                } else if (c == 'new_post_template_2'){
                    //将图片上传容器的大小改为返回来的图片的大小，更新容器中的图片
                    jQuery('.post_image_upload_wrap').css({
                        'height': img450.height,
                        'width': img450.width
                    })
                    jQuery('.imageHolder').css({
                        'background-size':'cover',
                        'background-image': 'url(' + p_450_max +')'
                    })
                    //赋值给隐藏的input
                    jQuery('#post_Img_1').val(p_450_max)
                //判断如果是模板3 或 4
                } else if (c == 'new_post_template_3' || c == 'new_post_template_4'){
                    jQuery('.post_image_upload_wrap').css({
                        'height': win_h
                    })
                    jQuery('.imageHolder').css({
                        'background-size':'cover',
                        'background-image': 'url(' + p_1201_max +')'
                    })
                    jQuery('#post_Img_1').val(p_1201_max)
                } else if (c == 'new_post_template_5'){
                    jQuery('.post_image_upload_wrap').css({
                        'height': win_h
                    })
                    jQuery('.imageHolder').css({
                        'background-size':'cover',
                        'background-image': 'url(' + p_450_max +')'
                    })
                    jQuery('#post_Img_1').val(p_450_max)

                    jQuery('.post_image_upload_wrap').css({
                        'height': win_h,
                        'width': 640,
                        'min-width' : 640
                    })
                    jQuery('.new_post_template_5 .post_name, .new_post_template_5 .post_caption, .new_post_template_5 .post_article, .new_post_template_5 .btn_controls').css({
                        'margin-left' : 690 
                    })
                    jQuery('.input-xxlarge').addClass('input-mlarge').removeClass('input-xxlarge');
                }
            },150)  

        //判断为点击上传：
        } else if (jQuery(".post_image_upload").css("background-image") != 'none'){
            var path = jQuery(".post_image_upload").css("background-image"),
                path = path.replace(/"/g,"").replace(/url\(|\)$/ig, ""),
                // http://0.0.0.0:8080/static/upload/post_img/2012/11/9/201211953523_4275cdf0357c5063d5580fa9b8204412_1200.jpg
                h = path.split("/", 3).join("/"),
                // http://0.0.0.0:8080
                d = path.replace(h, ""),
                // /static/upload/post_img/2012/11/9/201211953523_4275cdf0357c5063d5580fa9b8204412_1200.jpg
                p = d.split('_')[0] + "_" + d.split('_')[1] + "_" + d.split('_')[2],
                
                p_450_max = p+'_450-max.jpg',
                p_1200 = p+'_1200.jpg',
                p_1201_max = p+'_1201-max.jpg';

                // img1200 = new Image()
            var img450 = new Image();
            
            img450.src = p_450_max;
            
            // var win_w = jQuery(window).width();
                // img1200.src = p_1200

            setTimeout(function(){
                if (c == 'new_post_template_1'){
                    jQuery('.post_image_upload_wrap').css({
                        'height': '480px',
                        'width': 'auto'
                    })
                    jQuery('.post_image_upload').css({
                        'background-size':'cover',
                        'background-image': 'url(' + p_1200 +')'
                    })
                    jQuery('#post_Img_1').val(p_1200);
                } else if (c == 'new_post_template_2'){
                    jQuery('.post_image_upload_wrap').css({
                        'height': img450.height,
                        'width': img450.width
                    })
                    jQuery('.post_image_upload').css({
                        'background-size':'auto',
                        'background-image': 'url(' + p_450_max +')'
                    })
                    jQuery('#post_Img_1').val(p_450_max);
                } else if (c == 'new_post_template_3' || c == 'new_post_template_4' ){
                    jQuery('.post_image_upload_wrap').css({
                        'height': win_h //高度为浏览器窗口高度
                    })
                    jQuery('.post_image_upload').css({
                        'background-size':'cover',
                        'background-image': 'url(' + p_1201_max +')'
                    })
                    jQuery('#post_Img_1').val(p_1201_max);
                } else if (c == 'new_post_template_5' ){
                    jQuery('.post_image_upload_wrap').css({
                        'height': win_h //高度为浏览器窗口高度
                    })
                    jQuery('.post_image_upload').css({
                        'background-size':'cover',
                        'background-image': 'url(' + p_450_max +')'
                    })
                    jQuery('#post_Img_1').val(p_450_max);

                    // if (img450.width  < win_w*0.35 ){
                    //     jQuery('.post_image_upload_wrap').css({
                    //         'height': win_h,
                    //         // 'width': img450.width,
                    //         'min-width' : '35%'
                    //     })
                    //     jQuery('.new_post_template_5 .post_name, .new_post_template_5 .post_caption, .new_post_template_5 .post_article, .new_post_template_5 .btn_controls').css({
                    //         'margin-left' : '40%'
                    //     })

                    // } else if(win_w*0.35 < img450.width &&  img450.width < 640 ){
                    //     jQuery('.post_image_upload_wrap').css({
                    //         'height': win_h,
                    //         'width': img450.width,
                    //         'min-width' : img450.width
                    //     })
                    //     jQuery('.new_post_template_5 .post_name, .new_post_template_5 .post_caption, .new_post_template_5 .post_article, .new_post_template_5 .btn_controls').css({
                    //         'margin-left' : img450.width + 40 
                    //     })
                    //     jQuery('.input-xxlarge').addClass('input-mlarge').removeClass('input-xxlarge');

                    // } else if(img450.width == 640 ){
                        jQuery('.post_image_upload_wrap').css({
                            'height': win_h,
                            'width': 640,
                            'min-width' : 640
                        })
                        jQuery('.new_post_template_5 .post_name, .new_post_template_5 .post_caption, .new_post_template_5 .post_article, .new_post_template_5 .btn_controls').css({
                            'margin-left' : 690 
                        })
                        jQuery('.input-xxlarge').addClass('input-mlarge').removeClass('input-xxlarge');
                    // }
                }

            },150)

        //如果没有上传图片
        } else {
            if (c == 'new_post_template_4'){
                jQuery('.post_image_upload_wrap').css({
                    'height': win_h //高度为浏览器窗口高度
                })
            } else {
                jQuery('.post_image_upload_wrap').attr('style', '');
            }
            jQuery('#post_Img_1').val('');
        }
        
        //切换时的验证控制：html中已经增加了摘要验证============
        //模板1中忽略摘要验证，增加标题、正文、图片验证
        if (c == 'new_post_template_1'){
            jQuery('#switchImgWrap').hide();
            jQuery('.post_image_upload_wrap').show();

            //改变模板5的痕迹
            jQuery('.input-mlarge').addClass('input-xxlarge').removeClass('input-mlarge');
            jQuery('.new_post_template_1 .post_name, .new_post_template_1 .post_caption, .new_post_template_1 .post_article, .new_post_template_1 .btn_controls').attr('style','')

            jQuery('.post_caption textarea').attr('ignore','ignore');
            jQuery('.post_name input, .post_article textarea, #post_Img_1').removeAttr('ignore');
            jQuery('.post_caption textarea').attr('errormsg', '啊哈？超过240字了？').attr('datatype', 'post_Caption').attr('placeholder', '摘要 选填');
            jQuery('.post_article textarea').attr('placeholder', '正文 必填');
            // jQuery("#post_form_1 textarea, #post_form_1 input").removeClass('Validform_error')
            // jQuery("#post_form_1 .Validform_checktip").removeClass('Validform_wrong').html('')
            // jQuery("#post_form_1").Validform().check()
            jQuery("#post_form_1 .Validform_checktip").html('');
        }
        //模板2中忽略图片、 摘要验证，增加正文、标题验证
        if (c == 'new_post_template_2'){
            // jQuery('#switchImgWrap').css('display','inline-block');
            // jQuery('.post_image_upload_wrap').hide();
            //判断一下是不是已经上传了图片，然后把模板2中已上传的图片显示出来（默认是隐藏的）
            // alert(jQuery(".imageHolder").css("background-image"))
            if ((jQuery('.imageHolder').size() > 0 && jQuery(".imageHolder").css("background-image") != 'none') || jQuery(".post_image_upload").css("background-image") != 'none' ){
                // alert(1)
                jQuery('.post_image_upload_wrap').show();
                jQuery('#switchImgWrap').hide();
            } else{
                // alert(0)
                jQuery('.post_image_upload_wrap').hide();
                jQuery('#switchImgWrap').css('display','inline-block').html('上传图片');
            }
            jQuery('#post_Img_1, .post_caption textarea').attr('ignore','ignore');
            jQuery('.post_name input, .post_article textarea').removeAttr('ignore');
            jQuery('.post_caption textarea').attr('errormsg', '啊哈？超过240字了？').attr('datatype', 'post_Caption').attr('placeholder', '摘要 选填');
            jQuery('.post_article textarea').attr('placeholder', '正文 必填');
            // jQuery("#post_form_1 textarea, #post_form_1 input").removeClass('Validform_error')
            // jQuery("#post_form_1 .Validform_checktip").removeClass('Validform_wrong').html('')
            // jQuery("#post_form_1").Validform().check()
            jQuery("#post_form_1 .Validform_checktip").html('');
            
            //改变模板5的痕迹
            jQuery('.input-mlarge').addClass('input-xxlarge').removeClass('input-mlarge');
            jQuery('.new_post_template_2 .post_name, .new_post_template_2 .post_caption, .new_post_template_2 .post_article, .new_post_template_2 .btn_controls').attr('style','')
        }
        //模板3中忽略正文验证/摘要验证, 增加标题、图片验证
        if (c == 'new_post_template_3'){
            jQuery('#switchImgWrap').hide();

            //改变模板5的痕迹
            jQuery('.input-mlarge').addClass('input-xxlarge').removeClass('input-mlarge');
            jQuery('.new_post_template_3 .post_name, .new_post_template_3 .post_caption, .new_post_template_3 .post_article, .new_post_template_3 .btn_controls').attr('style','')

            jQuery('.post_image_upload_wrap').show();
            jQuery('.post_article textarea, .post_caption textarea').attr('ignore','ignore');
            jQuery('.post_name input, #post_Img_1').removeAttr('ignore');
            jQuery('.post_caption textarea').attr('errormsg', '啊哈？超过240字了？').attr('datatype', 'post_Caption').attr('placeholder', '摘要 选填');
            // jQuery("#post_form_1 textarea, #post_form_1 input").removeClass('Validform_error')
            // jQuery("#post_form_1 .Validform_checktip").removeClass('Validform_wrong').html('')
            // jQuery("#post_form_1").Validform().check()
            jQuery("#post_form_1 .Validform_checktip").html('');
        }
        //模板4中忽略正文验证/标题验证, 增加摘要、图片验证
        if (c == 'new_post_template_4'){
            jQuery('#switchImgWrap').hide();
            
            //改变模板5的痕迹
            jQuery('.input-mlarge').addClass('input-xxlarge').removeClass('input-mlarge');
            jQuery('.new_post_template_4 .post_name, .new_post_template_4 .post_caption, .new_post_template_4 .post_article, .new_post_template_4 .btn_controls').attr('style','')

            jQuery('.post_image_upload_wrap').show();
            jQuery('.post_article textarea, .post_name input').attr('ignore','ignore');
            jQuery('.post_caption textarea, #post_Img_1').removeAttr('ignore');
            jQuery('.post_caption textarea').attr('errormsg', '啊哈？超过35字了？').attr('datatype', 'post_Caption_4').attr('placeholder', '摘要');
            // jQuery("#post_form_1").Validform().check()
            jQuery("#post_form_1 .Validform_checktip").html('');
        }

        //模板4中忽略正文验证/标题验证, 增加摘要、图片验证
        if (c == 'new_post_template_5'){
            jQuery('#switchImgWrap').hide();
            jQuery('.post_name input').removeAttr('ignore');
            jQuery('.post_article textarea, .post_caption textarea, ').attr('ignore', 'ignore')
            jQuery('.post_article textarea').attr('placeholder', '正文 选填')
            jQuery('.post_caption textarea').attr('placeholder', '摘要 选填')
            jQuery('#post_Img_1').removeAttr('ignore');
        }

        //移除上次所有的表单验证
        jQuery('.Validform_checktip, #post_form_1 input, #post_form_1 textarea').removeClass('Validform_error').removeClass('Validform_wrong').removeClass('Validform_right')
        jQuery('.Validform_checktip').html('')

    })

//---------------------------------
//-----------模板 2切换 图片上传-----
//---------------------------------

jQuery('#switchImgWrap').toggle(
    function(){
        jQuery(this).html('取消上传');
        if(jQuery('.post_image_upload_wrap').css('display') == 'none'){
            jQuery('.post_image_upload_wrap').show();
        }
    },
    function(){
        jQuery(this).html('上传图片');
        if(jQuery('.post_image_upload_wrap').css('display') == 'block'){
            jQuery('.post_image_upload_wrap').hide();
        }
    }
)

//---------------------------------
//-----------拖拽上传图片-----------
//---------------------------------
    var dropbox = jQuery('.post_image_upload'),
        message = jQuery('.message', dropbox),
        template = '<div class="preview">'+
                        '<span class="imageHolder">'+
                            '<span class="uploaded"></span>'+
                        '</span>'+
                        '<div class="progressHolder">'+
                            '<div class="progress"></div>'+
                        '</div>'+
                    '</div>'; 

    dropbox.filedrop({
        // The name of the jQuery_FILES entry:
        paramname:'uploadImg',
        allowedfiletypes: ['image/jpeg','image/png','image/gif','image/bmp'],
        maxfiles: 1,
        maxfilesize: 2, //最大2M
        url: '/post/post_image_upload',
        uploadFinished:function(i,file,response){
            if (response.status == 's'){
                alert(response.info);
                jQuery(".preview").remove();
                // jQuery('.dragOverTip').hide()
                jQuery('.message').show()
                jQuery('.post_image_upload').css({
                    'background': '#EAF5FA'
                })
            } else if (response.status == 'o'){
                alert(response.info);
                jQuery(".preview").remove();
                // jQuery('.dragOverTip').hide()
                jQuery('.message').show()
                jQuery('.post_image_upload').css({
                    'background': '#EAF5FA'
                })
            } else if (response.status == 'y'){
                var c = jQuery('body').attr('class')
                //模板1
                if( c == "new_post_template_1"){
                    jQuery('#post_Img_1').val(''+ response.pic_1200);
                    jQuery(".imageHolder").css({
                        "background" : 'url("'+ response.pic_1200 +' ") center center no-repeat',
                        'background-size' : 'cover'
                    })
                //模板2
                } else if (c == 'new_post_template_2'){
                    jQuery('#post_Img_1').val(''+ response.pic_450); //模板1 图片必填

                    if (jQuery('body').attr('publish') == 'true'){
                        var img450 = new Image();
                        img450.src = response.pic_450;
                        setTimeout(function(){
                            jQuery('.post_image_upload_wrap').css({
                                'height': img450.height,
                                'width': img450.width
                            })
                        },250)
                    }
                    jQuery(".imageHolder").css({
                        "background" : 'url("'+ response.pic_450 +' ") center center no-repeat',
                        'background-size' : 'auto'
                    })
                //模板3 4
                } else if (c == 'new_post_template_3' || c == 'new_post_template_4' ){
                    if (jQuery('body').attr('publish') == 'true'){
                        jQuery('.post_image_upload_wrap').css({
                            'height': win_h //高度为浏览器窗口高度
                        })
                    }
                    jQuery('.imageHolder').css({
                        'background-size':'cover',
                        'background-image': 'url("' + response.pic_1201_max +'")'
                    })
                    jQuery('#post_Img_1').val(response.pic_1201_max)
                //模板 5
                } else if (c == 'new_post_template_5'){
                    jQuery('#post_Img_1').val(''+ response.pic_450)
                    if (jQuery('body').attr('publish') == 'true'){
                        var img450 = new Image();
                        img450.src = response.pic_450;
                        setTimeout(function(){
                            jQuery('.post_image_upload_wrap').css({
                                'height': win_h,
                                'width': img450.width
                            })
                        },250)
                    }
                    jQuery(".imageHolder").css({
                        "background" : 'url("'+ response.pic_450 +' ") center center no-repeat',
                        'background-size' : 'cover'
                    })

                    jQuery('.post_image_upload_wrap').css({
                        'height': win_h,
                        'width': 640,
                        'min-width' : 640
                    })
                    jQuery('.new_post_template_5 .post_name, .new_post_template_5 .post_caption, .new_post_template_5 .post_article, .new_post_template_5 .btn_controls').css({
                        'margin-left' : 690 
                    })
                    jQuery('.input-xxlarge').addClass('input-mlarge').removeClass('input-xxlarge');
                }

                jQuery.data(file).addClass('done');
                uploaded = jQuery('.uploaded', dropbox);
                jQuery(uploaded).fadeIn(300);
                
                jQuery('.upload_btn').hide();
                jQuery('.del_post_img, .save_post_img_btn').show();
                setTimeout(function(){
                    jQuery('.uploaded, .progressHolder').fadeOut(250)
                },1000)
            }
            
        },
        
        error: function(err, file) {
            switch(err) {
                case 'BrowserNotSupported':
                    showMessage('你的浏览器不支持HTML5上传');
                    break;
                case 'TooManyFiles':
                    alert('添加一张就可以了');
                    break;
                case 'FileTooLarge':
                    alert(file.name+' 太大了，请上传不超过2M的');
                    break;
                default:
                    break;
            }
        },
        
        beforeEach: function(file){
            if(!file.type.match(/^image\//)){
                alert('Only images are allowed!');
                return false;
            }
        },
        
        uploadStarted:function(i, file, len){
            createImage(file);
            jQuery(".post_image_upload_1").css({
                    'background': 'none'
                })
        },
        
        progressUpdated: function(i, file, progress) {
            jQuery.data(file).find('.progress').width(progress);
        }
         
    });
    
    function createImage(file){

        var preview = jQuery(template), 
            image = jQuery('.imageHolder', preview);
            
        var reader = new FileReader();
        
        // image.width = 100;
        // image.height = 100;
        
        reader.onload = function(e){
            
            // e.target.result holds the DataURL which
            // can be used as a source of the image:
            
            // image.attr('src',e.target.result);
            // image.css({
            //     "background" : 'url("'+ e.target.result +' ") center center no-repeat',
            //     'background-size' : 'cover'
            // })
        };
        
        // Reading the file as a DataURL. When finished,
        // this will trigger the onload function above:
        reader.readAsDataURL(file);
        
        message.hide();
        preview.appendTo(dropbox);
        
        // Associating a preview container
        // with the file, using jQuery's jQuery.data():
        
        jQuery.data(file,preview);
    }

    function showMessage(msg){
        message.html(msg);
    }

//---------------------------------
//-----------点击上传图片-----------
//---------------------------------
    jQuery("#upload_file_hide").change(function(){
        //创建FormData对象
        var data = new FormData();
        //为FormData对象添加数据
        jQuery.each(jQuery('#upload_file_hide')[0].files, function(i, file) {
            data.append('uploadImg', file);
        });
        jQuery(".post_image_upload").css({
            'background' : 'url(/static/public/img/onLoad.gif) center center no-repeat'
        }).find('.message').hide();
        jQuery.ajax({
            url: '/post/post_image_upload',
            type:'POST',
            data:data,
            cache: false,
            contentType: false,     //不可缺
            processData: false,     //不可缺
            dataType : "json",
            success:function(response){

                if (response.status == 's'){
                    alert(response.info);
                    jQuery(".preview").remove();
                    // jQuery('.dragOverTip').hide()
                    jQuery('.message').show()
                    jQuery('.post_image_upload').css({
                        'background': '#EAF5FA'
                    })
                } else if (response.status == 'o'){
                    alert(response.info);
                    jQuery(".preview").remove();
                    // jQuery('.dragOverTip').hide()
                    jQuery('.message').show()
                    jQuery('.post_image_upload').css({
                        'background': '#EAF5FA'
                    })
                } else if (response.status == 'y'){
                    var c = jQuery('body').attr('class')
                    if( c == "new_post_template_1"){
                        jQuery('#post_Img_1').val(''+ response.pic_1200);

                        if (jQuery('body').attr('publish') == 'true'){
                            jQuery('.post_image_upload_wrap').css({
                                'height': '480px',
                                'width': 'auto'
                            })
                        }

                        jQuery(".post_image_upload").css({
                            "background" : 'url("'+ response.pic_1200 +' ") center center no-repeat',
                            'background-size' : 'cover'
                        })
                    } else if (c == 'new_post_template_2'){
                        jQuery('#post_Img_1').val(''+ response.pic_450);
                        
                        if (jQuery('body').attr('publish') == 'true'){
                            img450 = new Image()
                            img450.src = response.pic_450
                            setTimeout(function(){
                                jQuery('.post_image_upload_wrap').css({
                                    'height': img450.height,
                                    'width': img450.width
                                })
                            },120)
                        }

                        jQuery(".post_image_upload").css({
                            "background" : 'url("'+ response.pic_450 +' ") center center no-repeat',
                            'background-size' : 'auto'
                        })
                    } else if (c == 'new_post_template_3' || c == 'new_post_template_4'){
                        jQuery('#post_Img_1').val(''+ response.pic_1201_max);

                        if (jQuery('body').attr('publish') == 'true'){
                            jQuery('.post_image_upload_wrap').css({
                                'height': win_h
                            })
                        }

                        jQuery(".post_image_upload").css({
                            "background" : 'url("'+ response.pic_1201_max +' ") center center no-repeat',
                            'background-size' : 'cover'
                        })
                    } else if (c == 'new_post_template_5'){
                        jQuery('#post_Img_1').val(''+ response.pic_450);

                        if (jQuery('body').attr('publish') == 'true'){
                            // img450 = new Image()
                            // img450.src = response.pic_450
                            // win_w = jQuery(window).width();

                            // setTimeout(function(){
                                
                                // if (img450.width  < win_w*0.35 ){
                                //     jQuery('.post_image_upload_wrap').css({
                                //         'height': win_h,
                                //         // 'width': img450.width,
                                //         'min-width' : '35%'
                                //     })
                                //     jQuery('.new_post_template_5 .post_name, .new_post_template_5 .post_caption, .new_post_template_5 .post_article, .new_post_template_5 .btn_controls').css({
                                //         'margin-left' : '40%'
                                //     })

                                // } else if(win_w*0.35 < img450.width &&  img450.width < 640 ){
                                //     jQuery('.post_image_upload_wrap').css({
                                //         'height': win_h,
                                //         'width': img450.width,
                                //         'min-width' : img450.width
                                //     })
                                //     jQuery('.new_post_template_5 .post_name, .new_post_template_5 .post_caption, .new_post_template_5 .post_article, .new_post_template_5 .btn_controls').css({
                                //         'margin-left' : img450.width + 40 
                                //     })
                                //     jQuery('.input-xxlarge').addClass('input-mlarge').removeClass('input-xxlarge');

                                // } else if(img450.width == 640 ){
                                    jQuery('.post_image_upload_wrap').css({
                                        'height': win_h,
                                        'width': 640,
                                        'min-width' : 640
                                    })
                                    jQuery('.new_post_template_5 .post_name, .new_post_template_5 .post_caption, .new_post_template_5 .post_article, .new_post_template_5 .btn_controls').css({
                                        'margin-left' : 690 
                                    })
                                    jQuery('.input-xxlarge').addClass('input-mlarge').removeClass('input-xxlarge');
                                // }
                            // },120)
                        }

                        jQuery(".post_image_upload").css({
                            "background" : 'url("'+ response.pic_450 +' ") center center no-repeat',
                            'background-size' : 'cover'
                        })

                        
                    }
                    jQuery('.message, .upload_btn').hide();
                    jQuery('.del_post_img, .save_post_img_btn').show()
                }
            },
            error:function(){
                alert("请检查文件格式或者文件大小，目前只支持jpg/gif/jpeg/png/bmp格式的图片。不能超过2M");
                jQuery('.message').show()
                jQuery('.post_image_upload').css({
                    'background': '#EAF5FA'
                })
            }
        });
    });

    //删除post图片
    function DeletePostImg(){
        // 需要判断是拖拽上传还是点击上传的
        if (jQuery('.imageHolder').size() > 0){
            var path = jQuery(".imageHolder").css("background-image");
        } else {
            var path = jQuery(".post_image_upload").css("background-image");
        }

        path = path.replace(/"/g,"").replace(/url\(|\)$/ig, "");
        // http://0.0.0.0:8080/static/upload/post_img/2012/11/9/201211953523_4275cdf0357c5063d5580fa9b8204412_1200.jpg
        h = path.split("/", 3).join("/");
        // http://0.0.0.0:8080
        d = path.replace(h, "");
        // /static/upload/post_img/2012/11/9/201211953523_4275cdf0357c5063d5580fa9b8204412_1200.jpg
        p = d.split('_')[0] + "_" + d.split('_')[1] + "_" + d.split('_')[2];
        // /static/upload/post_img/2012/11/9/201211953523_4275cdf0357c5063d5580fa9b8204412
        a = p.split("/",7).join("/");
        // /static/upload/post_img/2012/11/9
        b = p.replace(a, "").replace('/', "");
        // 201211953523_4275cdf0357c5063d5580fa9b8204412

        jQuery.ajax({
            url:'/post/post_image_delete',
            type:'POST',
            data:{path:a, part_name:b},
            dataType : "text",
            success:function(mes){
                if (mes == 's'){
                    var c = jQuery('body').attr('class');
                    //恢复上传容器的原始大小
                    jQuery('.post_image_upload_wrap').attr('style','')
                    jQuery('.input-mlarge').addClass('input-xxlarge').removeClass('input-mlarge');
                    //恢复模板 5 的margin-left
                    if (c == 'new_post_template_5'){
                        jQuery('.new_post_template_5 .post_name, .new_post_template_5 .post_caption, .new_post_template_5 .post_article').css({
                            'margin-left' : "40%"
                        })
                    }
                    if (jQuery('.imageHolder').size() > 0){
                        jQuery(".preview").remove();
                    }
                    jQuery('.post_image_upload').css({
                        'background':'#eaf5fa'
                    })
                    jQuery('.upload_btn, .message').show()
                    jQuery('.del_post_img, .save_post_img_btn').hide()
                    jQuery('.change_post_image_btn').css({
                        'background-color' : '#58AD69',
                        'color' : '#fff'
                    }).html('<i class="icon-pencil icon-white"></i> 更换图片');
                    
                }
            },
            error:function(){
                alert('出错，可能是服务器那边出问题了，请联系管理员');
            }
        });

        jQuery('#post_Img_1').val('')
    }

//删除更改图片是上传的图片
    jQuery(".del_post_img").click(DeletePostImg)

//验证表单 - 发布新片段 模板1
    jQuery("#post_form_1").Validform({
        ajaxPost:true,
        postonce:true,
        datatype : {
            "post_Img": /^(?!.{121}|^\s*$)/g,
            "post_Name": /^(?!.{31}|^\s*$)/g,
            "post_Caption": /^(?!.{241}|^\s*$)/g,
            "post_Caption_4": /^(?!.{36}|^\s*$)/g,
            "post_Article": /^(?!.{65535}|^\s*$)/g
        },
        tiptype:function(msg,o,cssctl){
            var objtip=o.obj.siblings(".Validform_checktip");
            cssctl(objtip,o.type);
            // alert(o.type)
            objtip.text(msg);
            //判断是否是图片部分的验证  o.type ==3是错误时
            if (o.obj.attr('id') == 'post_Img_1' && o.type == '3') {
                jQuery('.postImgValidformChecktip').slideDown(200).css({
                    'display' : 'inline-block'
                });
                setTimeout(function(){
                    jQuery(document).scrollTo('.post_image_upload_wrap', 300);
                },1000)
                setTimeout(function(){
                    jQuery('.postImgValidformChecktip').slideUp(200);
                },1500)
            }
            
        },
        beforeSubmit:function(curform){
            jQuery('.btn_controls button').html('发布中...').removeClass('btn-info');
        },
        callback:function(data){
            if(data.status=="y"){
                window.location.href = "/post/" + data.post_id;
            }
        }
    })

    //更换片段图片 模板1
    jQuery('.change_post_image_btn').click(function(){
        jQuery('.post_image_upload_wrap').toggle();
        if(jQuery(".post_image_upload_wrap").css('display') == 'block'){
            jQuery(this).css({
                'background-color' : '#C06862',
                'color' : '#E5D2D0'
            }).html('<i class="icon-remove icon-white"></i> 取消更换');
            jQuery('.post_image_upload').css({
                'background-color' : '#EAF5FA',
                'background-image' : ''
            })
        } else {
            var bg = jQuery('.post_image_upload').css('background-image');
            if(bg.indexOf("picture.png") <= 0) {
                DeletePostImg();
            }
            jQuery(this).css({
                'background-color' : '#58AD69',
                'color' : '#fff'
            }).html('<i class="icon-pencil icon-white"></i> 更换图片');
            
        }
    })

//切换片段标题编辑状态
    
    var post_Name = jQuery('#post_Name').val();

    jQuery('.post_title_edit, .cancel_title_btn').click(function(){
        
        jQuery('.post_title, #post_title_update_form').toggle();
        if(jQuery(this).hasClass('cancel_title_btn')){
            jQuery('.post_title span').html(post_Name)
            jQuery('#post_Name').val(post_Name)
        }
        
        // var c = jQuery('body').attr('class'); 
        // if (c == 'new_post_template_4'){
        //     jQuery('#post_field_update_form .post_caption textarea').attr('errormsg', '啊哈？超过35字了？').attr('datatype', 'post_Caption_4')
        // }
        //     // post_Caption_4
    })

//切换片段摘要、正文编辑状态
    jQuery('.post_field_edit, .cancel_field_btn').click(function(){
        var j = jQuery('#post_field_update_form').height(),
            c = jQuery('.post_field p:first').html(),
            // a = jQuery('.post_field p:eq(1)').html(),
            a = jQuery('#post_Article').val(),
            a = a.replace(/(<br\/>)/g, "\r\n");
            // b = jQuery('body').attr('class');

        jQuery('#post_field_update_form').toggle(0, function(){
            jQuery('#post_Caption').val(c)
            jQuery('#post_Article').val(a)
        })

        // jQuery('.btn-group, .share_sns').toggle()

        // if (b == 'new_post_template_4' || b == 'new_post_template_3'){
        //     $('#comment_block_wrap, #liker_block_wrap').hide()
        // }
        
        jQuery('.post_field').toggle();
        
        jQuery(document).stop().scrollTo('.post_content', 400);
    })

//验证表单 - 更新片段标题
//todo: 模板判断
    jQuery("#post_title_update_form").Validform({
        ajaxPost:true,
        datatype : {
            // "post_Name": /^(?!.{31}|^\s*$)/g,
            // "post_Caption": /^(?!.{241}|^\s*$)/g,
            // "post_Caption_4": /^(?!.{36}|^\s*$)/g,
            // "post_Article": /^(?!.{65535}|^\s*$)/g
            "post_Name": /^[\w\W]{1,30}$/,
            "post_Caption": /^[\w\W]{1,240}$/,
            "post_Caption_4": /^[\w\W]{1,35}$/,
            "post_Article": /^[\w\W]{50,60000}$/
        },
        tiptype:function(msg,o,cssctl){
            var objtip=o.obj.siblings(".Validform_checktip");
            cssctl(objtip,o.type);
            objtip.text(msg);
        },
        beforeSubmit:function(curform){
            curform.find('button').html('发布中...').removeClass('btn-info');
        },
        callback:function(data){
            var s = jQuery('#post_Name').val()
            if(data.status=="y"){
                jQuery('h1.post_title span').html(s)
                jQuery('h1.post_title').show()
                jQuery('#post_title_update_form').hide()
            }
        }
    })

//验证表单 - 更新片段摘要 正文
    jQuery("#post_field_update_form").Validform({
        ajaxPost:true,
        datatype : {
            "post_Name": /^[\w\W]{1,30}$/,
            "post_Caption": /^[\w\W]{1,240}$/,
            "post_Caption_4": /^[\w\W]{1,35}$/,
            "post_Article": /^[\w\W]{50,60000}$/,
        },
        tiptype:function(msg,o,cssctl){
            var objtip=o.obj.siblings(".Validform_checktip");
            cssctl(objtip,o.type);
            objtip.text(msg);
        },
        beforeSubmit:function(curform){
            curform.find('button').html('发布中...').removeClass('btn-info');
        },
        callback:function(data){
            var c = jQuery('#post_Caption').val(),
                a = jQuery('#post_Article').val(),
                regR = /\r/g,
                regN = /\n/g,
                a = a.replace(regR,"<br/>").replace(regN,"<br/>");
            if(data.status=="y"){
                location.reload()
                // jQuery('.post_field p:first').html(c),
                // jQuery('.post_field p:eq(1)').html(a)
                // jQuery('.post_field_border').show()
                // jQuery('#post_field_update_form').hide()
            }
        }
    })

//切换“喜欢”按钮的显藏
    jQuery('#post_btn').click(function(){
        jQuery('.sentiment_with_vote_block').toggle()
    })

//投票
    jQuery('.sentiment_with_vote_block').click(function(){
        var t = jQuery(this),
            post_id = t.attr('post-data'),
            user_data = t.attr('user-data');

        if(user_data == 'needLogin') {
            //未登录时 //记录url
            var loginBox = '<div class="loginBox">'+
                        '还没有登录呢，先去 ' +
                        '<a href="/">登录</a> 吧' +
                    '</div>',
                url =  window.location.href;
            $.fancybox( loginBox ,{minHeight : 10, minWidth : 200, padding : [10, 10, 10 ,30] });
            $.cookie('redirect_url', url, { expires: 7, path: '/'});
            // setTimeout(function(){$.fancybox.close()},3000)
            return false;
        } else if ( t.parents('.btn-group').eq(0).hasClass('active')) {
            //登录后并且已经投过票
            //取消投票
            jQuery.ajax({
                url:'/post/vote_cancel',
                type:'POST',
                data:{ post_id : post_id},
                dataType : "json",
                success:function(mes){
                    if (mes.status == 'y'){
                        var s = Number(jQuery('.btn-likers i').html());
                        t.parents('.btn-group').eq(0).removeClass('active').find('.sentiment_with_vote_block').find('.sentiment').html('喜欢');
                        jQuery('.btn-likers i').html(s-1);
                    }
                }
            });
            $('#mine-li').remove()
        } else {
            //登录后并且没投票
            //增加投票
            var s = Number(jQuery('.btn-likers i').html());

            t.parents('.btn-group').eq(0).addClass('active').find('.sentiment_with_vote_block').find('.sentiment').html('取消喜欢');
            jQuery('.btn-likers i').html(s+1);

            var href = $('.avatar20 .avatar_c').attr('href'), // 当前用户
                src = $('.avatar20 .avatar_c img').attr('src'),
                title = $('.avatar20 .avatar_c').attr('title');
            li = '<li id="mine-li"><a href="'+ href +'" title="'+ title +'"><img src="'+ src +'" alt="'+ title +'" /></a></li>'
            if($('#liker_block_wrap .user_list #mine-li').size() == 0) {
                $('#liker_block_wrap .user_list').prepend(li)
                jQuery.ajax({
                    url:'/post/vote',
                    type:'POST',
                    data:{ post_id : post_id,},
                    dataType : "json",
                    // success:function(mes){
                    //     if (mes.status == 'y'){
                            
                    //     }
                    // },
                    error:function(){
                        alert('sorry，出错了。请联系管理员。')
                    }
                });
            }

            
        }
    })

//显示喜欢的人列表
    jQuery('.btn-likers').click(function(){
        var c = jQuery('body').attr('class'); 
        if($('#liker_block_wrap').css('display') == 'none'){
            $('#liker_block_wrap').slideDown(200);
            if(c == 'new_post_template_4' || c == 'new_post_template_3'){
                // alert(1)
                setTimeout(function(){
                    $('body').scrollTo('#action_block', 100);
                },250)
            }
        }else{
            $('#liker_block_wrap').slideUp(100);
        }
    })
//关闭喜欢列表
    jQuery('.close_liker_block').click(function(){
        $('#liker_block_wrap').slideUp(100);
    })

//分享
    jQuery('.share_sns').hover(function(){
        var t = jQuery(this).find('.share_sns_list')
        t.show(200).css({
            'display' : 'inline-block',
            'visibility':'visible'
        })
    },function(){
            var t = jQuery(this).find('.share_sns_list')
            t.hide(150)
    })




    //mentions reply @回复
    // var names = new Array;
    // var usernames = new Array;
    // var avatars = new Array;
    // //得到所有评论的用户昵称 和 用户名 头像
    // jQuery('#comment_list .post_author_image_w').each(function(i) {
    //     names[i] = jQuery(this).attr('title');
    //     usernames[i] = jQuery(this).attr('href').split('/')[2];
    //     avatars[i] = jQuery(this).find('img').attr('src');
    // })

    // var replyUsers;

    // function getReplyUsers() {
    //     replyUsers = [];
    //     var pushed = {};
    //     pushed["post-rocker"] = 1;
    //     jQuery('.pic a').each(function(i, item) {
    //             var img = item.childNodes[1];
    //             var uid = item.href.slice(item.href.lastIndexOf('/') + 1);

    //             if (!(uid in pushed)) {
    //                 replyUsers.push({
    //                     name: img.alt,
    //                     username: uid,
    //                     avatar: img.src
    //                 });
    //                 pushed[uid] = 1;
    //             }
    //         }
    //     );
    // }
    // getReplyUsers();
    // // alert(replyUsers)

    // function filteredUser(keyword, limit, excludes) {
    //     if (!replyUsers) getReplyUsers();
    //     var limit = limit || 5;
    //     var users = [];
    //     var excludes = excludes || {};
    //     for (var i = 0, len = replyUsers.length; i < len && users.length < limit; i++) {
    //         var item = replyUsers[i];
    //         if (item.uid in excludes) continue;
    //         if (!keyword) {
    //             users.push(item);
    //             continue;
    //         }
    //         if (item.username.indexOf(keyword) !== -1) {
    //             users.push(item);
    //             continue;
    //         }
    //         if (item.uid.indexOf(keyword) !== -1) {
    //             users.push(item);
    //         }
    //     }
    //     // alert(JSON.stringify(users));
        
    //     // return {
    //     //     users: users
    //     // }

    //     return users
    // }

    // var users = replyUsers;
    // alert(users)
    // alert(JSON.stringify(users));
    // jQuery('#comment_block').append('<h1>豆瓣的</h1><p>' + JSON.stringify(users) + '</p>');




    // //数组去重函数
    // var planabc_uniq = function (arr) {  
    //     var a = [],  
    //         o = {},  
    //         i,  
    //         v,  
    //         cv, // corrected value  
    //         len = arr.length;  
      
    //     if (len < 2) {  
    //         return arr;  
    //     }  
      
    //     for (i = 0; i < len; i++) {  
    //         v = arr[i];  
      
    //         /* closurecache 提供的函数中使用的是  cv = v + 0;， 
    //          * 这样就无法辨别类似[1, 10, "1", "10"]的数组， 
    //          * 因为运算后 => 1, 10, 10, 100，很明显，出现了重复的标示符。 
    //          * 加前面就难道没问题吗？ 
    //          * 有的：数组中不能出现类似01 、001，以 0 开头的数字， 
    //          * 但适用性比原先更广。 
    //          */  
    //         cv = 0 + v;  
      
    //         if (!o[cv]) {  
    //             a.push(v);  
    //             o[cv] = true;  
    //         }  
    //     }  
    //     return a;  
    // }  

    // names = planabc_uniq(names)
    // usernames = planabc_uniq(usernames)
    // avatars = planabc_uniq(avatars)


    // var mynickname = jQuery('#navbarWrapper .avatar_c').attr('title'), //自己的昵称
    //     myusername = jQuery('#navbarWrapper .avatar_c').attr('href').split('/')[2], //自己的用户名
    //     myavatar = jQuery('#navbarWrapper .avatar_c img').attr('src'); //自己的头像
    // names.splice(jQuery.inArray(mynickname,names),1); //从昵称列表中去掉自己的昵称
    // usernames.splice(jQuery.inArray(myusername,usernames),1); //从昵称列表中去掉自己的用户名
    // avatars.splice(jQuery.inArray(myavatar,avatars),1); //从昵称列表中去掉自己的头像


    // // $.each(names, function(i){
    // //     alert(i + '=' + names[i] + ':'+ usernames[i])
    // // })

    // var names = jQuery.map(names, function(value,i) {
    //     return {'name':names[i],'username':usernames[i], 'avatar': avatars[i]};
    // });
    // // alert(names)
    // jQuery('#comment_block').append('<h1>自己的</h1><p>' + JSON.stringify(names) + '</p>');

    // //@插件
    // jQuery('#commentContent').atwho('@', {
    //     data : users,
    //     limit: 10,
    //     tpl: "<li data-value='${name}'><img src='${avatar}' alt='' />@ ${name} <small>${username}</small></li>"
    // });

    // //@插件
    // jQuery('#commentContent').atwho('@', {
    //     data : names,
    //     limit: 10,
    //     tpl: "<li data-value='${name}'><img src='${avatar}' alt='' />@ ${name} <small>${username}</small></li>"
    // });

    // // replace screenName in val, return uid
    // function cleanVal(val, users) {
    //   var reg_regchar = /(\\|\+|\:|\*|\/|\||\$|\?|\^|\[|\]|\(|\)\.)/g;
    //   var end_val = val || '';
    //   var tagged = '@芝 居 @Marshall';
    //   // var tagged = t.tagged;
    //   // alert('tagged:' + tagged)
    //   var name;
    //   var names = [];
    //   // for (name in tagged) {
    //   //   names.push(name.replace(reg_regchar, '\\$1'));
    //   // }

    //   if (!names.length) return end_val;

    //   names.sort(function(a, b) { return a.length < b.length });
    //   names = names.join('|');

    //   alert('names:' + names)

    //   end_val = end_val.replace(new RegExp('@(' + names + ')', 'g'), function(p0, p1) {
    //     // return '@' + tagged[p1];
    //     return '@' + 'test';
    //   });

    //   alert( 'end_val :' + end_val)

    //   // return false
    //   return end_val;
    // }

    // //提交评论是过滤用户名
    // jQuery('#postCommentForm').submit(function(e) {
    //     jQuery('#commentContent').val(cleanVal(jQuery('#commentContent').val(), users));
    //     // alert(jQuery('#commentContent').val())
    //     return false;
    // });

//未登录时保存跳转连接到cookie
    jQuery('#login_to_add_comment').click(function(){
        var url =  window.location.href;
        $.cookie('redirect_url', url, { expires: 7, path: '/'});
        window.location.href = '/';
    })
});



