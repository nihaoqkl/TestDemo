/**
 * Created by qkl | QQ:80508567 Wechat:qklandy on 2015/12/2.
 */
var utils= {
    //获取原生dom
    selector:function(selector){
        return $(selector).get(0);
    },
    //判定类型 string array object等 返回小写
    type:function(value){
        return Object.prototype.toString.call(value).split(" ")[1].replace(/\]/,'').toLowerCase();
    },

    /**
     * 继承超类属性和方法，不丢失自有的方法和属性
     * @param subClass       父类
     * @param superClass     子类
     * 需要理解原型继承，实例化后对象是有自己的分配空间的 和子类，超类，是否还在就不大关系了。可以直接对超类的prototype设置为null来测试
     * 相当于一次是实例化直接从类->超类->...->Object 一条链子就生成完成了
     */
    inherit:function(subClass,superClass){
        var oldPrototype=subClass.prototype;

        var noop = new Function();
        noop.prototype = superClass.prototype;
        var newObj = new noop;
        noop.prototype=null;

        //获取newObj是新增了所有超类属性和方法的
        utils.extend(newObj,oldPrototype,true);

        //重新让prototype指向newObj已获取所有方法和属性
        subClass.prototype = newObj;
        return newObj.constructor = subClass;
    },

    extend:function (t, s, b) {
        if (s) {
            for (var k in s) {
                //b=true 表示 hasOwnProperty不覆盖自有的方法或属性
                if (!b || !t.hasOwnProperty(k)) {
                    t[k] = s[k];
                }
            }
        }
        return t;
    },
    removeItem:function (array, item) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] === item) {
                array.splice(i, 1);
                i--;
            }
        }
    },
}