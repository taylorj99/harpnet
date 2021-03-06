import React from 'react'
import './ProfileViewFollowers.css'
import PropTypes from 'prop-types'
import { navigate, Link } from '@reach/router'

import Button from '../../Common/Buttons/Button'
import UserSearchInfo from '../../Search/UserSearchInfo/UserSearchInfo'

const ProfileViewFollowers = ({
  followers,
  clientFollows,
  clientId,
  handleFollow,
  handleUnfollow,
  inactiveButtons
}) => {
  const followersWidget = followers.map(follower => {
    return (
      <li key={follower.user_id} className='follower__follower'>
        <figure className='follower__img-box'>
          <img
            className='follower__img'
            src={`https://robohash.org/${follower.username}/?200x200`}
            alt='profile'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(`/profile/${follower.user_id}`)
            }}
          />
          <figcaption className='follower__img-caption'>
            <Link
              style={{ textDecoration: 'none' }}
              className='follower__username'
              to={`/profile/${follower.user_id}`}
            >
              {follower.username}
            </Link>
          </figcaption>
        </figure>
        <div className='follower__info'>
          <UserSearchInfo
            fname={follower.first_name}
            lname={follower.last_name}
            bio={follower.biography}
          />
        </div>
        <div className='follower__options'>
          {clientFollows.includes(follower.user_id) &&
          follower.user_id !== clientId ? (
            inactiveButtons.includes(follower.user_id) ? (
              <Button
                name={follower.user_id}
                className='unfollow'
                active={false}
              />
            ) : (
              <Button
                name={follower.user_id}
                text='Unfollow'
                callback={handleUnfollow}
                className='unfollow'
              />
            )
          ) : follower.user_id !== clientId ? (
            inactiveButtons.includes(follower.user_id) ? (
              <Button
                name={follower.user_id}
                className='follow'
                active={false}
              />
            ) : (
              <Button
                name={follower.user_id}
                text='Follow'
                callback={handleFollow}
                className='follow'
              />
            )
          ) : null}
          <Button
            text='View Profile'
            callback={() => {
              navigate(`/profile/${follower.user_id}`)
            }}
            className='edit-profile-btn'
          />
        </div>
      </li>
    )
  })
  return <ul className='followers'>{followersWidget}</ul>
}

ProfileViewFollowers.propTypes = {
  handleFollow: PropTypes.func.isRequired,
  handleUnfollow: PropTypes.func.isRequired,
  clientFollows: PropTypes.array.isRequired,
  clientId: PropTypes.number.isRequired,
  followers: PropTypes.array.isRequired,
  followings: PropTypes.array.isRequired,
  inactiveButtons: PropTypes.array.isRequired
}

export default ProfileViewFollowers
