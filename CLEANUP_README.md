AMU CONNECT – CLEANED STRUCTURE

What was done:
- All mock/fake data generators moved to src/utils/_deprecated_mocks
- These files should NOT be imported anywhere.

Next steps:
1. Replace any imports from mock files with Supabase queries.
2. Admission verification must ONLY query the database.
3. Enrollment numbers must ONLY come from DB triggers.

Rule:
Frontend must never decide acceptance, enrollment, or identity.
