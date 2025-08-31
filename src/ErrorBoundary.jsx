// ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('Caught by ErrorBoundary:', error, info); }
  render() {
    if (this.state.hasError) return <div className="p-6">Something went wrong. Please try again.</div>;
    return this.props.children;
  }
}
