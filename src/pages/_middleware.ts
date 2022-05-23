import { NO_AUTH_PATHS, PUBLIC_PATHS } from 'constant';
import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import { routeHelper } from 'utils';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();

  const accessToken = req.cookies['accessToken'];
  if (NO_AUTH_PATHS.includes(url.pathname)) {
    if (accessToken) {
      url.pathname = url.searchParams.get('redirect_url') ?? '/';
      return NextResponse.redirect(url);
    }
  } else if (!routeHelper.matchPublicPaths(url.pathname) && !accessToken) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
