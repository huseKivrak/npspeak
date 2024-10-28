import { getErrorRedirect } from './helpers/vercel';
import { redirect } from 'next/navigation';

/**
 * Redirects the user if they are the demo user attempting to delete a resource.
 *
 * **Note**:
 * This is a quick, temporary workaround to restrict demo user permissions
 * while RLS remains unsupported in Drizzle ORM.
 * This function will be replaced with RLS policies
 * for database-level security once RLS is supported (Drizzle v1).
 *
 * @param userId - The UID of authenticated user
 * @param redirectPath - The path to redirect the user if they are the demo user.
 * @param message - (optional) - A custom error message for the toast upon redirection.
 *
 *
 * This function checks if the user is the demo user by matching the provided
 * `userId` with the demo user ID stored as an environment variable.
 * If so, the user is redirected to the specified `redirectPath`
 * with an error message, preventing the delete action.
 */
export function redirectIfDemoUserDeleting(
  userId: string,
  redirectPath: string,
  message?: string
): void {
  const demoUserId = process.env.DEMO_USER_ID!;

  if (userId === demoUserId) {
    console.warn('demo user attempted to delete a resource.');

    const errorRedirectPath = getErrorRedirect(
      redirectPath,
      'action denied',
      message || 'demo user cannot delete resources.'
    );

    redirect(errorRedirectPath);
  }
}
