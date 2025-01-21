import React, { useState } from 'react';
import { Table, Button, Select, Spin, Alert, Pagination } from 'antd'; 
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllBloodDonationRequests = () => {
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure();

    const { data: users = { data: [], total: 0 }, isLoading, error, refetch } = useQuery({
        queryKey: ['users', currentPage, filter],
        queryFn: async () => {
            const response = await axiosSecure.get(`/donation-requests?page=${currentPage}&filter=${filter}`);
            return {
                data: response.data.data,
                total: response.data.total,
            };
        },
        keepPreviousData: true, 
    });

    const columns = [
        {
            title: 'Recipient Name',
            dataIndex: 'recipientName',
            key: 'recipientName',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Blood Group',
            dataIndex: 'bloodGroup',
            key: 'bloodGroup',
        },
        {
            title: 'Donation Date',
            dataIndex: 'donationDate',
            key: 'donationDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div className=' flex space-x-2'>
                    <Button type="primary" onClick={() => handleView(record._id)}>View</Button>
                    <Button onClick={() => handleEdit(record._id)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>


                </div>
            ),
        },
    ];

    const handleFilterChange = (value) => {
        setFilter(value);
        setCurrentPage(1); // Reset to first page on filter change
        refetch(); // Refetch data with the new filter
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        refetch(); // Refetch data with the new page number
    };

    const handleEdit = (id) => {
        // Logic to show edit form/modal or navigate to an edit page
        console.log(`Edit request ID: ${id}`);
    };
    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/donation-requests/${id}`);
            refetch(); // Refetch the data to update the table
            console.log(`Deleted request ID: ${id}`);
        } catch (error) {
            console.error('Error deleting the request:', error);
        }
    };
    
    

    return (
        <div>
            <h1 className='text-2xl text-center'>All Blood Donation Requests</h1>
            {isLoading ? (
                <Spin tip="Loading...">
                    <Table columns={columns} dataSource={[]} pagination={false} />
                </Spin>
            ) : error ? (
                <Alert message="Error" description="There was an error fetching the data." type="error" showIcon />
            ) : (
                <>
                    <Select
                        placeholder="Filter by status"
                        onChange={handleFilterChange}
                        style={{ width: 200, marginBottom: 20 }}
                    >
                        <Select.Option value="">All</Select.Option>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inprogress">In Progress</Select.Option>
                        <Select.Option value="done">Done</Select.Option>
                        <Select.Option value="canceled">Canceled</Select.Option>
                    </Select>
                    <Table
                        columns={columns}
                        dataSource={users.data}
                        rowKey="_id"
                        pagination={false}
                        scroll={{ x: 'max-content' }} 
                    />
                    <Pagination
                        current={currentPage}
                        total={users.total}
                        pageSize={10}
                        onChange={handlePageChange}
                        style={{ marginTop: 20 }}
                    />
                </>
            )}
        </div>
    );
};

export default AllBloodDonationRequests;
