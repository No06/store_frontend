export const nonull = (value: String | Array<any>) => {
	if (value == null || value.length == 0) return '必须填写'
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
export const length = (value: any, length: Number) => {
    if (value.length > length) return '超出设定长度'+length
    return true
}