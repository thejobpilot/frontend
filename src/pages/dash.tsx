import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import { useUser } from '@auth0/nextjs-auth0/client';

import ResponsiveAppBar from "@/components/navBar";
import React, {Component} from 'react'


export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}

class Dashboard extends Component<WithAuth0Props> {
  render() {
      const { user, error, isLoading } = this.props.auth0;

      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>{error.message}</div>;

      return (
        user && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )
      );
  }
}


