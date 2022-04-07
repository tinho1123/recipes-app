import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import './Share.css';

const copy = require('clipboard-copy');

export default function Share(props) {
  const [copied, setCopied] = useState([]);
  const { url } = props;
  return (
    <button
      type="button"
      disabled={ copied.includes(url) }
      className="share-btn"
      onClick={ () => {
        copy(url);
        setCopied([...copied, url]);
      } }
    >
      <img data-testid="share-btn" src={ shareIcon } alt="share" />
      {copied.includes(url) && 'Link copied!'}
    </button>
  );
}

Share.propTypes = { url: PropTypes.string }.isRequired;
