// Mock Users Data
import type { User } from '@/src/domain/entities';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john@example.com',
    name: 'John Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'creator-1',
    email: 'sarah@designstudio.com',
    name: 'Sarah Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    role: 'creator',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'creator-2',
    email: 'mike@uicraft.com',
    name: 'Mike UICraft',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    role: 'creator',
    createdAt: '2024-01-08T12:00:00Z',
    updatedAt: '2024-01-08T12:00:00Z',
  },
  {
    id: 'creator-3',
    email: 'emma@pixelart.io',
    name: 'Emma Pixel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    role: 'creator',
    createdAt: '2024-01-05T14:00:00Z',
    updatedAt: '2024-01-05T14:00:00Z',
  },
  {
    id: 'admin-1',
    email: 'admin@design-kit.com',
    name: 'Admin User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
