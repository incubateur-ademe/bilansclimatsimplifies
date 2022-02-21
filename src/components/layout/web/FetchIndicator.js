import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useIsFetching } from 'react-query'

const fetching = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`
const Wrapper = styled.div`
  position: relative;
  height: 0.25rem;
`
const Indicator = styled.div`
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;
  right: 0;
  height: 0.25rem;
  background-color: #fff;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000091;
    transform: translateX(-100%);
    transform-origin: left;
    opacity: 0.6;
    animation: ${(props) => (props.isFetching ? fetching : 'none')} 1000ms
      infinite;
  }
`
export default function FetchIndicator() {
  const isFetching = useIsFetching()
  return (
    <Wrapper>
      <Indicator isFetching={isFetching} />
    </Wrapper>
  )
}
