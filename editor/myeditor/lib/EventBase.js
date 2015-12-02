var EventBase = function () {};

EventBase.prototype = {
    addListener:function (types, listener) {
        types = $.trim(types).split(/\s+/);
        for (var i = 0, ti; ti = types[i++];) {
            getListener(this, ti, true).push(listener);
        }
    },
    removeListener:function (types, listener) {
        types = $.trim(types).split(/\s+/);
        for (var i = 0, ti; ti = types[i++];) {
            utils.removeItem(getListener(this, ti) || [], listener);
        }
    },
    fireEvent:function () {
        var types = arguments[0];
        types = $.trim(types).split(' ');
        for (var i = 0, ti; ti = types[i++];) {
            var listeners = getListener(this, ti),
                r, t, k;
            if (listeners) {
                k = listeners.length;
                while (k--) {
                    if(!listeners[k])continue;
                    t = listeners[k].apply(this, arguments);
                    if(t === true){
                        return t;
                    }
                    if (t !== undefined) {
                        r = t;
                    }
                }
            }
            if (t = this['on' + ti.toLowerCase()]) {
                r = t.apply(this, arguments);
            }
        }
        return r;
    },
    on : function(types, listener){
        return this.addListener(types,listener);
    },
    off : function(types, listener){
        return this.removeListener(types, listener)
    },
    trigger:function(){
        return this.fireEvent.apply(this,arguments);
    }
};

/**
 * 获得对象所拥有监听类型的所有监听器
 * @unfile
 * @module UE
 * @since 1.2.6.1
 * @method getListener
 * @public
 * @param { Object } obj  查询监听器的对象
 * @param { String } type 事件类型
 * @param { Boolean } force  为true且当前所有type类型的侦听器不存在时，创建一个空监听器数组
 * @return { Array } 监听器数组
 */
function getListener(obj, type, force) {
    var allListeners;
    type = type.toLowerCase();
    return ( ( allListeners = ( obj.__allListeners || force && ( obj.__allListeners = {} ) ) )
        && ( allListeners[type] || force && ( allListeners[type] = [] ) ) );
}

