// components/FarcasterAuth.tsx
import { SignInButton, useProfile } from '@farcaster/auth-kit';

export default function FarcasterAuth() {
  const { isAuthenticated, profile } = useProfile();

  return (
    <div>
      {!isAuthenticated ? (
        <SignInButton />
      ) : (
        <div>
          <p>Welcome, {profile?.username}! Your fid is: {profile?.fid}</p>
          {/* You can display more profile info here */}
        </div>
      )}
    </div>
  );
}
