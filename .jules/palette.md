## 2024-05-14 - Shared disabled state for Auth buttons
**Learning:** During login interactions, secondary auth methods (like Google or Passkeys) should share the disabled/loading state of the primary login action. This prevents confusing user feedback and stops race conditions from users clicking multiple authentication methods.
**Action:** When adding disabled/loading states to forms, always consider if there are secondary actions or alternative workflows that should also be disabled.
