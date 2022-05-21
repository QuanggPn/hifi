import { PUBLIC_PATHS } from 'constant';
import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import Utils from 'utils';

const noAuthPaths = ['/auth/login', '/auth/register'];
const publicPaths = ['/', '/job-posts', '/companies'];
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();

  const accessToken = req.cookies['accessToken'];
  if (noAuthPaths.includes(url.pathname)) {
    if (accessToken) {
      url.pathname = url.searchParams.get('redirect_url') ?? '/';
      return NextResponse.redirect(url);
    }
  } else if (!Utils.matchPublicPaths(url.pathname) && !accessToken) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
