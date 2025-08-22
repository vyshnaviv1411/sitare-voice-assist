Place product images for the Mobility Market here.

Required filenames used by the app's mock API (see `src/lib/api.ts`):

- `wheelchair.jpg` - image for the Ergonomic Wheelchair product (id: 2)
- `cane.jpg` - image for the Smart Navigation Cane product (id: 1)

Recommended steps:
1. Save the attached wheelchair photo as `wheelchair.jpg` and the cane/cane-like image as `cane.jpg`.
2. Put both files in `public/mobility/`.
3. Restart the dev server if you're running a production build. Vite dev server will pick up the new files automatically.

Notes:
- Use JPEG or PNG formats. Filenames and lowercase are important because the app expects these exact paths.
- If you want to support multiple images per product later, consider extending `mock.products` to include an `images: string[]` field and updating the UI to render a carousel.
