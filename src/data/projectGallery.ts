export type ProjectServiceSlug =
  | 'excavation'
  | 'concrete'
  | 'retaining-walls'
  | 'foundation'
  | 'hardscaping';

export type ProjectCategorySlug = 'all' | ProjectServiceSlug;

export type ProjectService = {
  slug: ProjectServiceSlug;
  label: string;
  eyebrow: string;
  description: string;
  showcaseImages: ProjectPhoto[];
  projectImages: ProjectPhoto[];
};

export type ProjectPhoto = {
  id: string;
  category: ProjectServiceSlug;
  categoryLabel: string;
  image: string;
  title: string;
  width: number;
  height: number;
};

const imageMeta: Record<ProjectServiceSlug, Record<string, { width: number; height: number }>> = {
  concrete: {
    '1.jpg': { width: 1200, height: 1600 },
    '2.jpg': { width: 1600, height: 1200 },
    '3.jpg': { width: 1600, height: 1200 },
    '4.jpg': { width: 1200, height: 1600 },
    'img-4440.jpg': { width: 1200, height: 1600 },
    'img-4522.jpg': { width: 1200, height: 1600 },
    'img-4525.jpg': { width: 1200, height: 1600 },
    'img-4611.jpg': { width: 1200, height: 1600 },
    'img-4612.jpg': { width: 1200, height: 1600 },
    'IMG_2100.jpg': { width: 1200, height: 1600 },
    'IMG_2101.jpg': { width: 1200, height: 1600 },
    'IMG_2102.jpg': { width: 1200, height: 1600 },
    'IMG_2103.jpg': { width: 1200, height: 1600 },
    'IMG_2104.jpg': { width: 1200, height: 1600 },
    'IMG_2105.jpg': { width: 1200, height: 1600 },
    'IMG_2106.jpg': { width: 1200, height: 1600 },
    'IMG_2107.jpg': { width: 1200, height: 1600 },
    'IMG_2108.jpg': { width: 1200, height: 1600 },
    'IMG_2109.jpg': { width: 1200, height: 1600 },
    'IMG_2110.jpg': { width: 1200, height: 1600 },
    'IMG_2111.jpg': { width: 1200, height: 1600 },
    'IMG_2112.jpg': { width: 1200, height: 1600 },
    'IMG_2114.jpg': { width: 1200, height: 1600 },
    'IMG_4523.jpg': { width: 1200, height: 1600 },
    'IMG_4924.jpg': { width: 1200, height: 1600 },
    'IMG_4969.jpg': { width: 1200, height: 1600 },
    'IMG_5006.jpg': { width: 1200, height: 1600 },
    'IMG_5202.jpg': { width: 1200, height: 1600 },
    'IMG_5314.jpg': { width: 1200, height: 1600 },
    'IMG_5662.jpg': { width: 1200, height: 1600 },
    'IMG_5664.jpg': { width: 1200, height: 1600 },
    'IMG_6082.jpg': { width: 1200, height: 1600 },
    'IMG_6084.jpg': { width: 1200, height: 1600 },
  },
  excavation: {
    '1.jpg': { width: 1200, height: 1600 },
    '2.jpg': { width: 1200, height: 1600 },
    '3.jpg': { width: 1200, height: 1600 },
    '4.jpg': { width: 1200, height: 1600 },
    'img-2873.jpg': { width: 1600, height: 1200 },
    'img-2875.jpg': { width: 1600, height: 1200 },
    'img-2905.jpg': { width: 1200, height: 1600 },
    'img-3687.jpg': { width: 1200, height: 1600 },
    'img-3689.jpg': { width: 1200, height: 1600 },
    'img-3690.jpg': { width: 1600, height: 1200 },
    'IMG_2119.jpg': { width: 1200, height: 1600 },
    'IMG_2120.jpg': { width: 1200, height: 1600 },
    'IMG_2121.jpg': { width: 1200, height: 1600 },
    'IMG_2122.jpg': { width: 1200, height: 1600 },
    'IMG_2123.jpg': { width: 1200, height: 1600 },
    'IMG_2124.jpg': { width: 1200, height: 1600 },
    'IMG_2125.jpg': { width: 1200, height: 1600 },
    'IMG_2126.jpg': { width: 1200, height: 1600 },
    'IMG_2127.jpg': { width: 1200, height: 1600 },
    'IMG_2128.jpg': { width: 1200, height: 1600 },
    'IMG_0781.jpg': { width: 1200, height: 1600 },
    'IMG_2262.jpg': { width: 1200, height: 1600 },
    'IMG_2872.jpg': { width: 1200, height: 1600 },
    'IMG_2873.jpg': { width: 1200, height: 1600 },
    'IMG_3688.jpg': { width: 1200, height: 1600 },
    'IMG_4723.jpg': { width: 1200, height: 1600 },
    'IMG_5677.jpg': { width: 1200, height: 1600 },
    'IMG_5817.jpg': { width: 1200, height: 1600 },
    'IMG_6095.jpg': { width: 1200, height: 1600 },
    'IMG_6335.jpg': { width: 1200, height: 1600 },
  },
  foundation: {
    '1.jpg': { width: 1200, height: 1600 },
    '2.jpg': { width: 1200, height: 1600 },
    '3.jpg': { width: 1600, height: 1200 },
    '4.jpg': { width: 1200, height: 1600 },
    'img-1023.jpg': { width: 1200, height: 1600 },
    'img-2793.jpg': { width: 1600, height: 1200 },
    'img-3539.jpg': { width: 1600, height: 1200 },
    'img-3544.jpg': { width: 1200, height: 1600 },
    'img-5155.jpg': { width: 1200, height: 1600 },
    'img-5768.jpg': { width: 1200, height: 1600 },
    'IMG_2144.jpg': { width: 1200, height: 1600 },
    'IMG_2145.jpg': { width: 1200, height: 1600 },
    'IMG_2146.jpg': { width: 1200, height: 1600 },
    'IMG_2147.jpg': { width: 1200, height: 1600 },
    'IMG_2149.jpg': { width: 1200, height: 1600 },
    'IMG_2150.jpg': { width: 1200, height: 1600 },
    'IMG_2151.jpg': { width: 1200, height: 1600 },
    'IMG_2152.jpg': { width: 1200, height: 1600 },
    'IMG_3539.jpg': { width: 1200, height: 1600 },
    'IMG_5124.jpg': { width: 1200, height: 1600 },
    'IMG_5156.jpg': { width: 1200, height: 1600 },
    'IMG_5768.jpg': { width: 1200, height: 1600 },
    'IMG_5772.jpg': { width: 1200, height: 1600 },
    'IMG_5993.jpg': { width: 1200, height: 1600 },
    'IMG_6032.jpg': { width: 1200, height: 1600 },
    'IMG_6662.jpg': { width: 1200, height: 1600 },
    'IMG_6663.jpg': { width: 1200, height: 1600 },
    'IMG_6665.jpg': { width: 1200, height: 1600 },
  },
  'retaining-walls': {
    '1.jpg': { width: 1200, height: 1600 },
    '2.jpg': { width: 1200, height: 1600 },
    '3.jpg': { width: 1200, height: 1600 },
    '4.jpg': { width: 1200, height: 1600 },
    'img-2722.jpg': { width: 1600, height: 1200 },
    'img-2723.jpg': { width: 1600, height: 1200 },
    'img-4306.jpg': { width: 1200, height: 1600 },
    'img-4308.jpg': { width: 1200, height: 1600 },
    'img-4356.jpg': { width: 1200, height: 1600 },
    'img-4762.jpg': { width: 1200, height: 1600 },
    'IMG_2129.jpg': { width: 1200, height: 1600 },
    'IMG_2131.jpg': { width: 1200, height: 1600 },
    'IMG_2132.jpg': { width: 1200, height: 1600 },
    'IMG_2134.jpg': { width: 1200, height: 1600 },
    'IMG_2135.jpg': { width: 1200, height: 1600 },
    'IMG_2136.jpg': { width: 1200, height: 1600 },
    'IMG_2137.jpg': { width: 1200, height: 1600 },
    'IMG_2138.jpg': { width: 1200, height: 1600 },
    'IMG_2139.jpg': { width: 1200, height: 1600 },
    'IMG_2140.jpg': { width: 1200, height: 1600 },
    'IMG_2141.jpg': { width: 1200, height: 1600 },
    'IMG_4437.jpg': { width: 1200, height: 1600 },
    'IMG_4759.jpg': { width: 1200, height: 1600 },
    'IMG_4760.jpg': { width: 1200, height: 1600 },
    'IMG_4761.jpg': { width: 1200, height: 1600 },
    'IMG_5451.jpg': { width: 1200, height: 1600 },
    'IMG_5453.jpg': { width: 1200, height: 1600 },
    'IMG_5464.jpg': { width: 1200, height: 1600 },
    'IMG_6560.jpg': { width: 1200, height: 1600 },
    'IMG_6563.jpg': { width: 1200, height: 1600 },
    'IMG_6564.jpg': { width: 1200, height: 1600 },
  },
  hardscaping: {
    '1.jpg': { width: 1200, height: 1600 },
    '2.jpg': { width: 1200, height: 1600 },
    '3.jpg': { width: 1200, height: 1600 },
    '4.jpg': { width: 1200, height: 1600 },
    'IMG_0056.jpg': { width: 1200, height: 1600 },
    'IMG_0404.jpg': { width: 1200, height: 1600 },
    'IMG_2174.jpg': { width: 1200, height: 1600 },
    'IMG_4309.jpg': { width: 1200, height: 1600 },
    'IMG_4433.jpg': { width: 1200, height: 1600 },
    'IMG_4939.jpg': { width: 1200, height: 1600 },
    'IMG_4942.jpg': { width: 1200, height: 1600 },
    'IMG_5185.jpg': { width: 1200, height: 1600 },
    'IMG_5189.jpg': { width: 1200, height: 1600 },
    'IMG_5190.jpg': { width: 1200, height: 1600 },
  },
};

const buildPhotos = (
  slug: ProjectServiceSlug,
  label: string,
  files: string[],
  variant: 'showcase' | 'project'
): ProjectPhoto[] =>
  files.map((file, index) => {
    const meta = imageMeta[slug][file];

    return {
      id: `${slug}-${variant}-${index + 1}`,
      category: slug,
      categoryLabel: label,
      image: `/project-gallery/${slug}/${file}`,
      title: `${label} ${variant === 'showcase' ? 'Showcase' : 'Project'} ${index + 1}`,
      width: meta.width,
      height: meta.height,
    };
  });

export const projectServices: ProjectService[] = [
  {
    slug: 'excavation',
    label: 'Excavation',
    eyebrow: 'Site Prep',
    description:
      'Precision digging, grading, and site preparation that sets every project up correctly from day one.',
    showcaseImages: buildPhotos('excavation', 'Excavation', ['1.jpg', '2.jpg', '3.jpg', '4.jpg'], 'showcase'),
    projectImages: buildPhotos(
      'excavation',
      'Excavation',
      ['img-2873.jpg', 'img-2875.jpg', 'img-2905.jpg', 'img-3687.jpg', 'img-3689.jpg', 'img-3690.jpg', 'IMG_2119.jpg', 'IMG_2120.jpg', 'IMG_2121.jpg', 'IMG_2122.jpg', 'IMG_2123.jpg', 'IMG_2124.jpg', 'IMG_2125.jpg', 'IMG_2126.jpg', 'IMG_2127.jpg', 'IMG_2128.jpg', 'IMG_0781.jpg', 'IMG_2262.jpg', 'IMG_2872.jpg', 'IMG_3688.jpg', 'IMG_4723.jpg', 'IMG_5677.jpg', 'IMG_5817.jpg', 'IMG_6095.jpg'],
      'project'
    ),
  },
  {
    slug: 'concrete',
    label: 'Concrete',
    eyebrow: 'Flatwork',
    description:
      'Concrete installs with clean forms, durable finishes, and details that hold up to weather and traffic.',
    showcaseImages: buildPhotos('concrete', 'Concrete', ['1.jpg', '2.jpg', '3.jpg', '4.jpg'], 'showcase'),
    projectImages: buildPhotos(
      'concrete',
      'Concrete',
      ['img-4440.jpg', 'img-4522.jpg', 'img-4525.jpg', 'img-4611.jpg', 'img-4612.jpg', 'IMG_2100.jpg', 'IMG_2101.jpg', 'IMG_2102.jpg', 'IMG_2103.jpg', 'IMG_2104.jpg', 'IMG_2105.jpg', 'IMG_2106.jpg', 'IMG_2107.jpg', 'IMG_2108.jpg', 'IMG_2109.jpg', 'IMG_2110.jpg', 'IMG_2111.jpg', 'IMG_2112.jpg', 'IMG_2114.jpg', 'IMG_4523.jpg', 'IMG_5006.jpg', 'IMG_5314.jpg', 'IMG_5662.jpg', 'IMG_5664.jpg', 'IMG_6082.jpg', 'IMG_6084.jpg'],
      'project'
    ),
  },
  {
    slug: 'retaining-walls',
    label: 'Retaining Walls',
    eyebrow: 'Wall Systems',
    description:
      'Retaining wall builds that balance structure, drainage, and curb appeal for demanding grades.',
    showcaseImages: buildPhotos('retaining-walls', 'Retaining Walls', ['1.jpg', '2.jpg', '3.jpg', '4.jpg'], 'showcase'),
    projectImages: buildPhotos(
      'retaining-walls',
      'Retaining Walls',
      ['img-2722.jpg', 'img-2723.jpg', 'img-4306.jpg', 'img-4308.jpg', 'img-4356.jpg', 'img-4762.jpg', 'IMG_2129.jpg', 'IMG_2131.jpg', 'IMG_2132.jpg', 'IMG_2134.jpg', 'IMG_2135.jpg', 'IMG_2136.jpg', 'IMG_2137.jpg', 'IMG_2138.jpg', 'IMG_2139.jpg', 'IMG_2140.jpg', 'IMG_2141.jpg', 'IMG_4437.jpg', 'IMG_4759.jpg', 'IMG_4760.jpg', 'IMG_4761.jpg', 'IMG_5451.jpg', 'IMG_5453.jpg', 'IMG_5464.jpg', 'IMG_6560.jpg', 'IMG_6563.jpg', 'IMG_6564.jpg'],
      'project'
    ),
  },
  {
    slug: 'foundation',
    label: 'Foundation',
    eyebrow: 'Structural Base',
    description:
      'Foundation work built for alignment, strength, and the kind of accuracy new construction depends on.',
    showcaseImages: buildPhotos('foundation', 'Foundation', ['1.jpg', '2.jpg', '3.jpg', '4.jpg'], 'showcase'),
    projectImages: buildPhotos(
      'foundation',
      'Foundation',
      ['img-1023.jpg', 'img-2793.jpg', 'img-3544.jpg', 'img-5155.jpg', 'img-5768.jpg', 'IMG_2144.jpg', 'IMG_2145.jpg', 'IMG_2146.jpg', 'IMG_2147.jpg', 'IMG_2149.jpg', 'IMG_2150.jpg', 'IMG_2151.jpg', 'IMG_2152.jpg', 'IMG_5124.jpg', 'IMG_5156.jpg', 'IMG_5772.jpg', 'IMG_5993.jpg', 'IMG_6032.jpg'],
      'project'
    ),
  },
  {
    slug: 'hardscaping',
    label: 'Hardscaping',
    eyebrow: 'Outdoor Living',
    description:
      'Custom hardscape elements designed for beauty, durability, and lasting outdoor enjoyment.',
    showcaseImages: buildPhotos('hardscaping', 'Hardscaping', ['1.jpg', '2.jpg', '3.jpg', '4.jpg'], 'showcase'),
    projectImages: buildPhotos(
      'hardscaping',
      'Hardscaping',
      ['IMG_0056.jpg', 'IMG_0404.jpg', 'IMG_2174.jpg', 'IMG_4309.jpg', 'IMG_4433.jpg', 'IMG_4939.jpg', 'IMG_4942.jpg', 'IMG_5185.jpg', 'IMG_5190.jpg'],
      'project'
    ),
  },
];

export const projectCategories = [
  {
    slug: 'all' as const,
    label: 'All',
    eyebrow: 'Full Portfolio',
    description:
      'Browse every recent service photo in one place, or switch into a specific discipline below.',
  },
  ...projectServices.map((service) => ({
    slug: service.slug,
    label: service.label,
    eyebrow: service.eyebrow,
    description: service.description,
  })),
];

export const showcaseCategories = projectServices.map((service) => ({
  slug: service.slug,
  label: service.label,
  eyebrow: service.eyebrow,
  description: service.description,
}));

export const showcaseItems = projectServices.flatMap((service) => service.showcaseImages);

export const projectPhotos = projectServices.flatMap((service) => service.projectImages);
