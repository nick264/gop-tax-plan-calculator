import React from 'react'

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
  EmailShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const RedditIcon = generateShareIcon('reddit');
const EmailIcon = generateShareIcon('email');

import styles from '../css/socialShare.css'

const SocialShare = () => {
  const url = window.location.href
  const iconSize = 32
  const title = "Tax Plan Impact Calculator"
  const description = "See how the congressional tax plan will affect your taxes"
  
  return(
    <div className={styles.SocialContainer}>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={iconSize} round={true}/>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={iconSize} round={true}/>
      </TwitterShareButton>
      <RedditShareButton url={url} title={title}>
        <RedditIcon size={iconSize} round={true}/>
      </RedditShareButton>
      <EmailShareButton url={url} subject={title} body={url}>
        <EmailIcon size={iconSize} round={true}/>
      </EmailShareButton>
      <LinkedinShareButton url={url} title={title} description={description}>
        <LinkedinIcon size={iconSize} round={true}/>
      </LinkedinShareButton>
    </div>
  )
}

export default SocialShare