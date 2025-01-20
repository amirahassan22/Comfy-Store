import dayjs from 'dayjs';
import React from 'react';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

export default function OrderList({orders,meta}) {
    
  return (
    <div>
        <p>total orders : {meta.pagination.total}</p>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th className='hidden sm:block'>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {orders.map((order) => {
                const { address, createdAt, numItemsInCart, orderTotal, name } = order.attributes;
               const formatDate = dayjs(createdAt).format('hh:mm a - MMM Do, YYYY');
                
                return (
                  <tr key={order.id}>
                    <th>{name}</th>
                    <td>{address}</td>
                    <td>{numItemsInCart}</td>
                    <td>{orderTotal}</td>
                    <td className='hidden sm:block'>{formatDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
  )
}
