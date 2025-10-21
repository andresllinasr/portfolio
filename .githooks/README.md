# Git Hooks - Branch Protection Rules

Simple, readable Git hooks for enforcing branch protection and code quality.

## Setup

```bash
# Make setup script executable and run it
chmod +x .githooks/setup.sh
./.githooks/setup.sh
```

## Rules Enforced

### Pre-commit Hook (`pre-commit`)

1. **Branch Naming Convention**
   - ✅ `feature/add-user-auth`
   - ✅ `bugfix/fix-login-error` 
   - ✅ `hotfix/security-patch`
   - ❌ `random-branch-name`

2. **Protected Branches**
   - Prevents direct commits to `main` and `develop`
   - Forces use of feature branches + PRs

3. **ESLint Validation**
   - Runs ESLint on all staged JS/TS files
   - Blocks commit if linting fails

4. **Code Quality Checks**
   - Warns about TODO/FIXME comments
   - Warns about console.log statements

### Commit Message Hook (`commit-msg`)

1. **Minimum Length**
   - Requires at least 10 characters

2. **Conventional Commits (Warning)**
   - Recommends format: `type(scope): description`
   - Examples: `feat: add login`, `fix(hero): animation bug`

3. **Work-in-Progress Detection**
   - Blocks commits starting with WIP, TODO, FIXME

## Manual Override

If you need to bypass hooks temporarily:

```bash
# Skip pre-commit hook
git commit --no-verify -m "emergency fix"

# Skip all hooks
git commit --no-verify --no-edit
```

## Customization

Edit the hook files directly:
- `.githooks/pre-commit` - Pre-commit rules
- `.githooks/commit-msg` - Commit message rules

## Troubleshooting

**Hooks not running?**
```bash
# Check Git configuration
git config core.hooksPath

# Should output: .githooks
```

**Permission errors?**
```bash
# Make hooks executable
chmod +x .githooks/*
```
