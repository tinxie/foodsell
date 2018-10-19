// local storage通用存取库。
// 设置存放函数   通过商家id来存放，第二个参数key,以后项目拓展可能会涉及到不同的字段。
export function saveToLocal (id, key, value) {
	// 将数据通过localstorage放到__seller__字段里面，使用seller变量表示
  let seller = window.localStorage.__seller__;
  // 第一次是没有__seller__的，需要判断，如果没有seller,将seller设置为一个对象，
  // 每个seller下面有一个id，也设置为对象，
  // 然后将value保存到seller下的id下的key里面,与id相关联
  if (!seller) {
  	seller = {};
  	seller[id] = {};
  } else {
  	// 如果不是第一次存取，已经有了seller，先将JSON 字符串解析为对象
  	// （因为localstorage直接存取是一个json字符串），拿到对象进行判断，
  	// 如果没有注册过这个商家，就为这个商家创建一个对象，为什么要再一次判断id，
  	// 因为如果第一次保存是A商家，而第二次保存的是B商家，那这里B商家是没有的。
  	seller = JSON.parse(seller);
  	if (!seller[id]) {
  		seller[id] = {};
  	}
  }
  seller[id][key] = value;
  // 将seller对象转化为json字符串存进__seller__字段
  window.localStorage.__seller__ = JSON.stringify(seller);
};

// 读取   通过id和key读取，如果读取不到就使用一个default默认值
export function loadFromLocal (id, key, def) {
 // 拿到seller
  let seller = window.localStorage.__seller__;
  // 如果没有seller就返回默认值
  if (!seller) {
  	return def;
  }
  // 有seller就使用json.parse将json字符串转化成对象，取到所有商家对象
  seller = JSON.parse(seller)[id];
  // 取不到则返回默认值
  if (!seller) {
  	return def;
  }
  // 否则就拿到key,如果没有key就返回默认值
  let ret = seller[key];
  return ret || def;
}