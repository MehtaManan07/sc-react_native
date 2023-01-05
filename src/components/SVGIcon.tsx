/* eslint-disable sort-keys-fix/sort-keys-fix */
// src/components/SVGIcon.js
import {useTheme} from '@react-navigation/native';
import React from 'react';

import DropDownIcon from '../assets/icons/feed/dropdown.svg';
import AwayIcon from '../assets/icons/profile/away.svg';
import DNDIcon from '../assets/icons/profile/dnd.svg';
import NotificationsIcon from '../assets/icons/profile/notifications.svg';
import PreferencesIcon from '../assets/icons/profile/preferences.svg';
import SavedItemsIcon from '../assets/icons/profile/saved-items.svg';
import ViewProfileIcon from '../assets/icons/profile/view-profile.svg';
import VerifiedBadge from '../assets/icons/profile/verified-badge.svg';
import NotificationsTabIconActive from '../assets/icons/tab-bar/bell-selected.svg';
import NotificationsTabIcon from '../assets/icons/tab-bar/bell.svg';
import HomeTabIconActive from '../assets/icons/tab-bar/home-selected.svg';
import HomeTabIcon from '../assets/icons/tab-bar/home.svg';
import CreatePostTabIconActive from '../assets/icons/tab-bar/plus-selected.svg';
import CreatePostTabIcon from '../assets/icons/tab-bar/plus.svg';
import KebabIcon from '../assets/icons/post/kebab.svg';
import DotIcon from '../assets/icons/post/dot.svg';
import LikedIcon from '../assets/icons/post/heart_active.svg';
import LikeIcon from '../assets/icons/post/heart_passive.svg';
import GlobalSearchSelectedIcon from '../assets/icons/tab-bar/search-selected.svg';
import GlobalSearchIcon from '../assets/icons/tab-bar/search.svg';
import YouTabIconActive from '../assets/icons/tab-bar/you-selected.svg';
import YouTabIcon from '../assets/icons/tab-bar/you.svg';
import BugIcon from '../assets/icons/settings/bug.svg';
import PrivacyIcon from '../assets/icons/settings/privacy.svg';
import LogOutIcon from '../assets/icons/settings/logout.svg';
import BookmarkIcon from '../assets/icons/settings/bookmark.svg';
import SocialIcon from '../assets/icons/settings/social.svg';

const iconMap = {
  // Tab related icons
  'home-tab': HomeTabIcon,
  'home-tab-active': HomeTabIconActive,
  'search-tab': GlobalSearchIcon,
  'search-tab-active': GlobalSearchSelectedIcon,
  'post-tab': CreatePostTabIcon,
  'post-tab-active': CreatePostTabIconActive,
  'notifications-tab': NotificationsTabIcon,
  'notifications-tab-active': NotificationsTabIconActive,
  'you-tab': YouTabIcon,
  'you-tab-active': YouTabIconActive,

  // Profile page icons
  away: AwayIcon,
  dnd: DNDIcon,
  notifications: NotificationsIcon,
  preferences: PreferencesIcon,
  'saved-items': SavedItemsIcon,
  'view-profile': ViewProfileIcon,
  verified: VerifiedBadge,

  // Feed
  'drop-down': DropDownIcon,

  // Post
  kebab: KebabIcon,
  dot: DotIcon,
  liked: LikedIcon,
  like: LikeIcon,

  // Settings
  logout: LogOutIcon,
  bug: BugIcon,
  privacy: PrivacyIcon,
  bookmark: BookmarkIcon,
  social: SocialIcon,
};

export const SVGIcon = ({fill, height, type, width}) => {
  const {colors} = useTheme();
  const Component = iconMap[type];

  return <Component fill={fill || '#000'} height={height} width={width} />;
};
