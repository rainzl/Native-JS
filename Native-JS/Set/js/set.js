;(function(){
	//Set构造函数
	function Set(){
		this.values = {}; //集合数据保存在对象里
		this.n = 0; //集合中值得个数
		this.add.apply(this,arguments);//将参数都添加进集合中
	}
	//将每个参数都添加进集合中
	Set.prototype.add = function() {
		for (var i=0; i<arguments.length; i++) {
			var val = arguments[i];
			var str = Set._vTOs(val);//将val转为字符串
			if ( !this.values.hasOwnProperty(str) ) { //如果值不在集合中，添加值并计数
				this.values[str] = val;
				this.n++;
			}
		}
		return this;//支持链式方法调用
	}
	//从集合删除元素，这些元素由参数指定
	Set.prototype.remove = function () {
		for ( var i=0; i<arguments.length; i++ ) {
			var str = Set._vTOs(arguments[i]);//将val转为字符串
			if (this.values.hasOwnProperty(str)) {//如果值在集合中，删除值并计数
				delete this.values[str];
				this.n--;
			}
		}
		return this;//支持链式方法调用
	}
	//如果集合包含这个值，返回true，否则返回false
	Set.prototype.contains = function (value) {
		return this.values.hasOwnProperty(Set._vTOs(value));
	}
	//返回集合大小
	Set.prototype.size = function () {
		return this.n;
	}
	//遍历集合中的所有元素，在指定的上下文中调用f。
	Set.prototype.forEach = function (f,context) {
		for ( var s in this.values ) {
			f.call(context,this.values[s]);
		}
	}
	//这是一个内部函数，用以将任意js值和唯一的字符串对应起来
	Set._vTOs = function (val) {
		switch(val){
			case undefined: return 'u';
			case null: return 'n';
			case true: return 't';
			case false: return 'f';
			default:
				switch (typeof val) {
					case 'string': return '"'+val;
					case 'number': return '#'+val;
					default: return '@'+objectId(val);
				}
		}
		
		function objectId(o) {
			var prop = '|**objectid**|';    //私有属性，用以存放id
			if ( !o.hasOwnProperty(prop) ) {//如果对象没有id
				
				o[prop] = Set._vTOs.next++; //将下一个值赋给它
				console.log(o.length)
				console.log(o)
				
			}
			return o[prop]; //返回这个id
		}
	}
	Set._vTOs.next = 100;
	window.Set = Set;
})()