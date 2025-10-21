#!/bin/bash

# Setup script for Git hooks
# Run this once: chmod +x .githooks/setup.sh && ./.githooks/setup.sh

echo "🔧 Setting up Git hooks..."

# Make hooks executable
chmod +x .githooks/pre-commit
chmod +x .githooks/commit-msg

# Configure Git to use our hooks directory
git config core.hooksPath .githooks

echo "✅ Git hooks setup complete!"
echo ""
echo "Configured hooks:"
echo "  📝 pre-commit: Branch naming, ESLint, protected branches"
echo "  💬 commit-msg: Message validation, conventional commits"
echo ""
echo "Branch naming rules:"
echo "  ✅ feature/your-feature-name"
echo "  ✅ bugfix/fix-description"
echo "  ✅ hotfix/urgent-fix"
echo "  ❌ random-branch-name"
echo ""
echo "Protected branches: main, develop"
