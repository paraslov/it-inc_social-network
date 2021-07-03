

export const updateObjInArray = (arr: any, propForSearch: any, propToCompare: any, propsChanges: {}) => {
    return arr.map((u: any) => u[propForSearch] === propToCompare ? {...u, ...propsChanges} : u)
}