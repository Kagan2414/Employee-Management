import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
          <p className="mb-6">Please refresh the page or contact support if the problem persists.</p>
          <button 
            onClick={() => window.location.href = '/'} 
            className="btn-primary"
          >
            Go to HomePage
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;