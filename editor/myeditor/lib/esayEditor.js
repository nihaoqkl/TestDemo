/**
 * Created by qkl | QQ:80508567 Wechat:qklandy on 2015/12/1.
 */
;(function($, win, undefined){
    //全局变量
    var document = window.document,
        $document = $(document),
        $window = $(window),
        $body = $('body'),
        $prefix = 'easyEditor_',
        index = 1; //编辑器index，用于同个页面初始化多个编辑器

    ////判断IE6、7、8  //暂时不做ie兼容好了 后续加上
    //var isIE6 = false,
    //    isIE7 = false,
    //    isIE8 = false,
    //    appVersion;
    //if(navigator.appName === "Microsoft Internet Explorer"){
    //    appVersion = $.trim(navigator.appVersion.split(";")[1]);
    //    isIE6 = appVersion === 'MSIE6.0';
    //    isIE7 = appVersion === 'MSIE7.0';
    //    isIE8 = appVersion === 'MSIE8.0';
    //}


    var eE = window.easyEditor = function(selector, options){
        return new eE.fn.init(selector, options);
    };

    eE.fn=eE.prototype; //原型链

    //全局eE的方法
    $.extend(eE,{

    });

    //eE默认的一些配置和属性参数
    $.extend(eE,{
        CommonTemplate: {
            toolBar: '<div class="'+$prefix+'toolBar">'+
                        '<ul class="clearfix">'+
                        '<li><a href="#" data-cmd="bold"><i class="icon iconfont"></i></a></li>'+
                        '<li><a href="#" data-cmd="italic"><i class="icon iconfont"></i></a></li>'+
                        '<li><a href="#" data-cmd="strike"><i class="icon iconfont"></i></a></li>'+
                        '<li><a href="#" data-cmd="underline"><i class="icon iconfont"></i></a></li>'+
                        '<li><a href="#" data-cmd="char"><i class="icon iconfont"></i></a></li>'+
                        '</ul></div>',
            floatBar: '<div class="'+$prefix+'floatBar">'+
                        '<ul class="clearfix">'+
                        '<li><a href="#" data-cmd="bold"><i class="icon iconfont"></i></a></li>'+
                        '<li><a href="#" data-cmd="italic"><i class="icon iconfont"></i></a></li>'+
                        '<li><a href="#" data-cmd="strike"><i class="icon iconfont"></i></a></li>'+
                        '<li><a href="#" data-cmd="underline"><i class="icon iconfont"></i></a></li>'+
                        '<li><a href="#" data-cmd="char"><i class="icon iconfont"></i></a></li>'+
                        '<li><a href="#" class="ee-remove"><i class="icon iconfont"></i></a></li>'+
                        '</ul></div>',

        }
    });

    //初始化toolbar
    $.extend(eE.fn,{
        initConfig:function(){
            /*
             menus = {
             'menuId-1': {
             'title': （字符串，必须）标题,
             'type':（字符串，必须）类型，可以是 btn / dropMenu / dropPanel / modal,
             'cssClass': （字符串，必须）fontAwesome字体样式，例如 'fa fa-head',
             'style': （字符串，可选）设置btn的样式
             'hotKey':（字符串，可选）快捷键，如'ctrl + b', 'ctrl,shift + i', 'alt,meta + y'等，支持 ctrl, shift, alt, meta 四个功能键（只有type===btn才有效）,
             'beforeFn': (函数，可选) 点击按钮之后立即出发的事件
             'command':（字符串）document.execCommand的命令名，如'fontName'；也可以是自定义的命令名，如“撤销”、“插入表格”按钮（type===modal时，command无效）,
             'commandValue': (字符串) document.execCommand的命令值，如 'blockQuote'，可选
             'dropMenu': （$ul，可选）type===dropMenu时，要返回一个$ul，作为下拉菜单,
             'modal':（$div，可选）type===modal是，要返回一个$div，作为弹出框,
             'callback':（函数，可选）回调函数,
             },
             'modaId-2':{
             ……
             }
             }
             */
        },
        initToolBar:function(){
            //暂时写死，后续动态根据配置
            $('#'+this.getCurrentEditorSelector()).before($(eE.CommonTemplate.toolBar).addClass('toolBar'+this.getIndex()));
            $('#'+this.getCurrentEditorSelector()).after($(eE.CommonTemplate.floatBar).addClass('floatBar'+this.getIndex()));
        },
        initEvent:function(){
            var editor=this,
                index=this.getIndex(),
                _frame=utils.selector('#'+$prefix+index),
                _doc=_frame.contentWindow.document;

            //工具条注册事件
            $('.toolBar'+this.getIndex()).find('a').each(function(i,v){
                $(v).on('click',function(e){
                    var that = $(this);
                    _frame.focus();
                    _doc.execCommand(that.data('cmd'),false,'');
                });
            });

            //浮动条注册事件
            $('.floatBar'+this.getIndex()).find('a').each(function(i,v){

                $(v).on('click',function(e){
                    var that = $(this);
                    _frame.focus();
                    _doc.execCommand(that.data('cmd'),false,null);
                });


                if($(v).hasClass('ee-remove')){
                    $(v).on('click',function(){
                        var selection=_doc.getSelection(),
                            range=selection.getRangeAt(0);
                        // console.log(_doc.queryCommandState('bold')); //判断当前的range是否执行过
                        if(utils.type(range)!='null' && range.toString().length>=1){
                            // $(selection.anchorNode.parentNode).remove();
                            range.deleteContents();
                        }
                    });
                }
            });

            var getPoint={};
            $document.on('mousemove',function(e){
                getPoint={x: e.clientX,y: e.clientY}
            });

            //浮动条和range检测处理等
            $(_doc).on('mouseup',function(e){
                var range=_doc.getSelection().getRangeAt(0);
                // console.log(_doc.queryCommandState('bold')); //判断当前的range是否执行过
                if(utils.type(range)!='null' && range.toString().length>=1){
                    //快捷浮动条
                    $(document).find('.floatBar'+index).show().css({left: e.clientX-58+'px',top: e.clientY-20+'px'});
                } else {
                    $(document).find('.floatBar'+index).hide();
                }
            });

            $('#eE_imagescale_cover').on('click',function(){
                $('#eE_imagescale').hide();
                $('#eE_imagescale_cover').hide();
            });

            $(_doc).on('click','.eE-image',function(e){
                var selection=_doc.getSelection(),
                    range=selection.getRangeAt(0);
                if(e.target!=this) {
                    $('#eE_imagescale').hide();
                    $('#eE_imagescale_cover').hide();
                } else {
                    if(utils.type(range)!='null'){
                        $('#eE_imagescale').css({
                            width:$(this).width()+2+'px',
                            height:$(this).height()+2+'px',
                            top:$(_frame).offset().top+$(this).offset().top-1+'px',
                            left:$(_frame).offset().left+$(this).offset().left-1+'px',
                        }).show();
                        $('#eE_imagescale_cover').css({
                            width:$(_doc).width()+2+'px',
                            height:$(_doc).height()+2+'px',
                            top:$(_frame).offset().top+$(this).offset().top-1+'px',
                            left:$(_frame).offset().left+$(this).offset().left-1+'px',
                        }).show();
                    }
                }
            });



        },

        getIndex: function(){
            return this.index;
        },
        getCurrentEditorSelector: function(){
            return $prefix + this.index;
        },

        //初始化
        init: function(selector, options){

            var editor = this,
                _frame = utils.selector(selector),
                _window = _frame.contentWindow,
                _doc = _window.document;

            this.index=index++;

            //设置id
            $(_frame).attr('id',editor.getCurrentEditorSelector());

            //默认配置
            editor.initConfig();
            //初始化ToolBar
            editor.initToolBar();

            //初始化编辑器
            $(_frame).css({
                width:utils.type(eEConfig.width)!='null'?eEConfig.width:'100%',
                height:utils.type(eEConfig.height)!='null'?eEConfig.height:$(win).height()+'px'});
            _doc.designMode="on";//设置为设计模式，就可以填写内容了  开启后注册事件会失效
            _doc.open();
            _doc.close();

            $(_doc).find('body').css({padding:'8px',wordWrap:'break-word'});

            //初始化事件
            editor.initEvent();

            //返回------------------
            return editor;
        }
    });

    //集成selection和range
    $.extend(eE.fn,{
        selection: {
            get:function(doc){

            }
        },
        range: {

        }
    });

    //集成EventBase事件
    utils.extend(eE.fn,EventBase.prototype,true);
    //重点！！！
    //构造函数是$E.fn.init，将构造函数的prototype指向$E.fn
    eE.fn.init.prototype = eE.fn;

    $.extend($.fn,{
        easyEditor:function(options){

            var options = options || {};

            var editor = $E(this, options);

            this.before(editor.$editorContainer);
            this.hide();

            //页面刚加载时，初始化selection
            editor.initSelection();

            //返回editor对象
            return editor;
        }
    });

})(jQuery,window);