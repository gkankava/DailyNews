export function queryKeyFactory(queryKey: string) {
    const factoryKeys = {
        all: [queryKey], 
        lists: () => [...factoryKeys.all, 'list'], 
        list: (filters: any) => [...factoryKeys.lists(), { ...filters }], 
        details: () => [...factoryKeys.all, 'detail'], 
        detail: (id: any) => [...factoryKeys.details(), id] 
    }
    return factoryKeys
}