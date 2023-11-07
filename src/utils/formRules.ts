export const nonull = (value: String | Array<any>) => {
	if (value == null || value == undefined || value == "" || value.length == 0) return '必须填写'
	return true
}
export const integer = (value: any) => {
	const rep = /[.]/
	if (!rep.test(value)) return true
	return '必须为整数'
}
export const postive = (value: any) => {
	if (value >= 0) return true
	return '必须为正数'
}
export const length = (value: string | Array<any>, length: number) => {
    if (value.length > length) return '超出设定长度'+length
    return true
}
export const price = (value: number) => {
	const str = value.toString()
	const dot = str.indexOf(".")
	const dec = str.length - dot - 1
	if (dot != -1 && dec > 2) {
		return "超出两位小数"
	}
	return true
}