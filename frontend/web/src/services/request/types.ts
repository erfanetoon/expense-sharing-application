export interface IEndpoint {
    methods: ("GET" | "POST" | "PUT" | "PATCH" | "DELETE")[];
    url: string;
}

export type TEndpoints<TKeys extends string | number | symbol> = Record<
    TKeys,
    IEndpoint
>;

export type TUrl<TKeys extends string | number | symbol> =
    | keyof TEndpoints<TKeys>
    | {
          base: keyof TEndpoints<TKeys>;
          params: object;
      };
