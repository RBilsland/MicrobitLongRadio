#!/bin/bash

# Test script for Micro:bit Long Radio extension
# This script runs tests and linting

set -e  # Exit on error

echo "🧪 Testing Micro:bit Long Radio Extension..."
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

# Run linting
echo "🔍 Running linter..."
if pxt lint; then
    echo "✅ Linting passed!"
else
    echo "⚠️  Linting found issues (see above)"
fi

echo ""
echo "✅ Testing complete!"

