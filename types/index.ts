export interface BaseResponse<T> {
    result :T ;
    errors: Array<string>;
}
