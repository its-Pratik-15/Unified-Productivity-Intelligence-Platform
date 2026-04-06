export function getStringParam(param: string | string[] | undefined): string {
    if (Array.isArray(param)) {
        return param[0] || '';
    }
    return param || '';
}

export function getNumberParam(param: string | string[] | undefined): number | undefined {
    const str = getStringParam(param);
    const num = parseInt(str);
    return isNaN(num) ? undefined : num;
}
