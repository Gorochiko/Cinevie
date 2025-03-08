'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Pencil, Trash } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UserManagementPage() {
    const router = useRouter();
    const { data: users = [], error, mutate } = useSWR('/api/users', fetcher);

    const handleEdit = (id: string) => {
        router.push(`/users/edit/${id}`);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        const response = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("User deleted successfully!");
            mutate(); // Cập nhật lại dữ liệu người dùng từ SWR
        } else {
            alert("Failed to delete user.");
        }
    };


    const handleCreateUser = () => {
        router.push('/dashboards/users/create');
    };

    if (error) return <div>Error loading users.</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl mb-4">Quản lý người dùng</h1>
            <Button className="mb-4" onClick={handleCreateUser}>Thêm người dùng</Button>

            <Table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>_id</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) ? (
                        users.map((user: any, index: number) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button size="sm" variant="outline" onClick={() => handleEdit(user.id)}>
                                        <Pencil size={16} />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <Trash size={16} />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>No users found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

        </div>
    );
}
