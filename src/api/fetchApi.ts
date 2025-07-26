function makeQueryParams(
    parameterObject: { [s: string]: unknown } | ArrayLike<unknown>
) {
    if (!parameterObject) {
        return "";
    }

    const params = new URLSearchParams();

    Object.entries(parameterObject).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((value) => params.append(key, value.toString()));
        } else if (value !== null && value !== "" && value !== undefined) {
            params.append(key, value.toString());
        }
    });

    return `?${params.toString()}`;
}

interface FetchApiOptions extends RequestInit {
    queryParams?: { [key: string]: unknown };
}

function createFetch(DOMAIN: string) {
    return async function fetchApi<T = unknown>(
        path: string,
        options: FetchApiOptions = {},
        expectedResponseType?: "raw"
    ): Promise<T | Response | "ok"> {
        const { queryParams, ...restOptions } = options;

        const params = makeQueryParams(queryParams ?? {});
        const url = `${DOMAIN}${path}${params}`;

        const response = await fetch(url, restOptions);

        if (response.status === 204) {
            return "ok";
        }

        if (expectedResponseType === "raw") {
            return response;
        }

        const data: T = await response.json();

        if (!response.ok) {
            if (data) {
                (data as any).status = response.status;
                throw data;
            }

            let error = "Network response was not ok";

            // @ts-expect-error: data may not have these properties
            if (data.error_message) {
                // @ts-expect-error
                error = data.error_message;
            }

            // @ts-expect-error
            if (data.errors) {
                // @ts-expect-error
                error = data.errors;
            }

            error = response.statusText;

            throw new Error(error);
        }

        return data;
    };
}
export default createFetch;