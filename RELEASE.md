# MemoryRelay Node.js SDK - Release Instructions

## NPM Publishing Setup

### 1. Create NPM Access Token

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click "Generate New Token" → "Automation"
3. Copy the token (starts with `npm_`)

### 2. Add Token to GitHub Secrets

1. Go to https://github.com/memoryrelay/node-sdk/settings/secrets/actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Paste your npm token
5. Click "Add secret"

### 3. Verify Package Name

The package will be published as: `@memoryrelay/sdk`

Make sure you have access to publish under the `@memoryrelay` scope:
```bash
npm access ls-packages memoryrelay
```

If not, create the organization or request access.

### 4. Test Local Build

```bash
npm run build
npm pack
```

This creates a `.tgz` file you can test locally:
```bash
npm install memoryrelay-sdk-0.1.0.tgz
```

## Release Process

### Option 1: Manual Release (First Time)

```bash
# Login to npm
npm login

# Publish (with --access public for scoped package)
npm publish --access public
```

### Option 2: Automated Release (Preferred)

Once NPM_TOKEN is configured:

```bash
# Tag the release
git tag -a v0.1.0 -m "Release v0.1.0

Features:
- Full TypeScript SDK for MemoryRelay
- Memories, Entities, Agents resources
- Batch operations and semantic search
- Automatic retries and error handling
- 21 tests passing
"

# Push tag
git push origin v0.1.0
```

GitHub Actions will automatically:
1. Run tests on Node 16, 18, 20
2. Build the package
3. Publish to npm
4. Create GitHub release

## Verify Publication

After publishing:

```bash
# Check npm
npm view @memoryrelay/sdk

# Install and test
npm install @memoryrelay/sdk
node -e "const {MemoryRelay} = require('@memoryrelay/sdk'); console.log('✅ Import works')"
```

## Troubleshooting

### "You do not have permission to publish"

Create the @memoryrelay npm organization:
```bash
npm org create memoryrelay
```

Or publish without scope (as `memoryrelay-sdk` instead).

### "Package name too similar to existing package"

Check for conflicts:
```bash
npm search memoryrelay
```

### GitHub Actions fails

Check:
- NPM_TOKEN secret is set correctly
- Token has publish permissions
- Package name doesn't conflict

## Post-Release

1. Update README with installation badge
2. Announce on Discord/Twitter
3. Add to MemoryRelay docs
4. Create example projects
