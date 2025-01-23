import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Table, Button, Dropdown, Menu } from "antd";
import { FaUsers } from "react-icons/fa";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState('all');

    const { data: users = { data: [] }, refetch } = useQuery({
        queryKey: ["users", filter],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users?filter=${filter}`);
          return {
            data: res.data.data,
          };
        },
        keepPreviousData: true,
    });

    const handleBlockUnblock = async (userId, status) => {
        await axiosSecure.put(`/users/${userId}/status`, { status });
        refetch(); // Refetch data after status change
    };

    const handleRoleChange = async (userId, role) => {
        await axiosSecure.patch(`/users/${userId}/role`, { role })
        .then(res => {
            if (res.data.modifiedCount > 0) {
                refetch(); // Refetch data after role change
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'image',
            render: (image) => <img src={image} alt="User Avatar" className="w-10 h-10 rounded-full" />,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (status === 'active' ? 'Active' : 'Blocked'),
        },
        {
            title: 'Actions',
            render: (_, user) => (
                <Dropdown overlay={
                    <Menu>
                        {user.status === 'active' ? (
                            <Menu.Item onClick={() => handleBlockUnblock(user._id, 'blocked')}>Block</Menu.Item>
                        ) : (
                            <Menu.Item onClick={() => handleBlockUnblock(user._id, 'active')}>Unblock</Menu.Item>
                        )}
                        <Menu.Item onClick={() => handleRoleChange(user._id, 'volunteer')}>Make Volunteer</Menu.Item>
                        <Menu.Item onClick={() => handleRoleChange(user._id, 'admin')}>Make Admin</Menu.Item>
                    </Menu>
                }>
                    <Button>Actions</Button>
                </Dropdown>
            ),
        }
    ];

    return (
        <div className="py-4">
            <h2 className="text-2xl text-center">All Users</h2>
            <div className="flex justify-between mb-4">
                <div className="flex gap-x-2 items-center">
                    <FaUsers className="text-2xl" />
                    <h2 className="text-2xl">Total Users: {users.data.length}</h2>
                </div>
                <div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
            </div>
            <div style={{ maxHeight: "500px", overflowX: "auto" }} className="overflow-hidden">
                <Table 
                    dataSource={users.data} 
                    columns={columns} 
                    pagination={false} // No pagination
                    rowKey="_id" 
                    scroll={{ x: "max-content" }} // Enable horizontal scroll
                />
            </div>
        </div>
    );
};

export default AllUsers;
