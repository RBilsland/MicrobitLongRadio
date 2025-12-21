#!/bin/bash

# Build script for Micro:bit Long Radio extension
# This script builds and tests the extension locally

set -e  # Exit on error

echo "🔨 Building Micro:bit Long Radio Extension..."
echo ""

# Check if pxt is installed
if ! command -v pxt &> /dev/null; then
    echo "❌ Error: pxt command not found"
    echo "   Please install pxt globally: npm install -g pxt"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "pxt.json" ]; then
    echo "❌ Error: pxt.json not found. Are you in the extension directory?"
    exit 1
fi

# Set target to microbit
echo "📦 Setting target to microbit..."
pxt target microbit

# Install dependencies
echo "📥 Installing dependencies..."
pxt install

# Build the extension
echo "🔨 Building extension..."
if pxt build; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "To test the extension locally, run:"
    echo "  npm run serve"
    echo ""
    echo "Or use:"
    echo "  pxt serve"
    echo ""
    echo "Then open http://localhost:3232/ in your browser"
else
    echo ""
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

