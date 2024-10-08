export const Urls = {
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`
}

export const routeList = ['/', '/auth/signin', '/auth/signup', '/about', '/products', '/carts', '/profile', '/auth/signout', '/products/add'];
export const routeListDisabledAuth = ["/auth/signin", "/auth/signup", "/auth/signout"];
export const routeParamList = [/^\/products\/\d+$/];
export const routeDisabledSidebar = ["/auth/signin", "/auth/signup"];