/**
 * Created by qkl | QQ:80508567 Wechat:qklandy on 2015/12/2.
 */
var utils= {
    //��ȡԭ��dom
    selector:function(selector){
        return $(selector).get(0);
    },
    //�ж����� string array object�� ����Сд
    type:function(value){
        return Object.prototype.toString.call(value).split(" ")[1].replace(/\]/,'').toLowerCase();
    },

    /**
     * �̳г������Ժͷ���������ʧ���еķ���������
     * @param subClass       ����
     * @param superClass     ����
     * ��Ҫ���ԭ�ͼ̳У�ʵ��������������Լ��ķ���ռ�� �����࣬���࣬�Ƿ��ھͲ����ϵ�ˡ�����ֱ�ӶԳ����prototype����Ϊnull������
     * �൱��һ����ʵ����ֱ�Ӵ���->����->...->Object һ�����Ӿ����������
     */
    inherit:function(subClass,superClass){
        var oldPrototype=subClass.prototype;

        var noop = new Function();
        noop.prototype = superClass.prototype;
        var newObj = new noop;
        noop.prototype=null;

        //��ȡnewObj�����������г������Ժͷ�����
        utils.extend(newObj,oldPrototype,true);

        //������prototypeָ��newObj�ѻ�ȡ���з���������
        subClass.prototype = newObj;
        return newObj.constructor = subClass;
    },

    extend:function (t, s, b) {
        if (s) {
            for (var k in s) {
                //b=true ��ʾ hasOwnProperty���������еķ���������
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