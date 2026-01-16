import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader, User as UserIcon, Shield, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/dialogs";

type UserProfile = {
  id: string;
  username: string | null;
  full_name: string | null;
  email?: string;
  role: string | null;
  created_at: string;
};

export const UsersManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [newRole, setNewRole] = useState<string>('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Try to get emails from auth (this might not work without service role)
      // For now, we'll use username or id
      const usersWithEmail = (profiles || []).map((profile) => ({
        ...profile,
        email: profile.username || profile.id.slice(0, 8) + '...',
      }));

      setUsers(usersWithEmail);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole || null })
        .eq('id', selectedUser.id);

      if (error) throw error;

      toast.success(`User role updated to ${newRole || 'user'}`);
      setRoleDialogOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast.error(error.message || 'Failed to update user role');
    }
  };

  const handleOpenRoleDialog = (user: UserProfile) => {
    setSelectedUser(user);
    setNewRole(user.role || '');
    setRoleDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <Loader className="h-6 w-6 animate-spin text-coffee-medium" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-coffee-darkest mb-6">
        Users Management
      </h2>

      {users.length === 0 ? (
        <div className="text-center py-10 text-coffee-dark">
          No users found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Manage user accounts and roles</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email/Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-coffee-medium" />
                      <span>{user.full_name || user.username || 'User'}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email || user.username || user.id.slice(0, 8)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.role || 'user'}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenRoleDialog(user)}
                    >
                      {user.role === 'admin' ? (
                        <ShieldOff className="h-4 w-4 mr-1" />
                      ) : (
                        <Shield className="h-4 w-4 mr-1" />
                      )}
                      Manage Role
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Role Update Dialog */}
      <AlertDialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update User Role</AlertDialogTitle>
            <AlertDialogDescription>
              Change the role for {selectedUser?.full_name || selectedUser?.username || 'this user'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full mt-2 p-2 border rounded-md"
              >
                <option value="">user (default)</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateRole}>
              Update Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

