

export interface Article{
    title: string,
    body: string,
    author: string,
    id: number,
    created?: Date | string | number,
    updated?: Date | string | number,
    isPublished?: boolean
}