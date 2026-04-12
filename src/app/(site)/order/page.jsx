import React from "react";
import { getOrders } from "@/app/service/service";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OrderPage() {
  const session = await auth();
  
  if (!session?.accessToken) {
    redirect("/login");
  }

  const result = await getOrders(session.accessToken);
  const orders = result?.payload || [];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h2>
            <p className="text-gray-500">Looks like there are no orders tied to this account.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.orderId} className="rounded-[20px] border border-gray-200 bg-white p-6 shadow-sm">
                {/* Header row */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs font-bold text-gray-400 tracking-wider mb-1 uppercase">Order</div>
                    <div className="text-lg font-bold text-gray-900">#{order.orderId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-gray-400 mb-1">Total</div>
                    <div className="text-lg font-bold text-gray-900">${(order.totalAmount || 0).toFixed(2)}</div>
                  </div>
                </div>
                
                <hr className="border-gray-100 my-4" />

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6 mt-4">
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">User ID</div>
                    <div className="text-sm font-medium text-gray-800 break-all">{order.appUserId}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Order date</div>
                    <div className="text-sm font-medium text-gray-800">
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Line items</div>
                    <div className="text-sm font-medium text-gray-800">
                      {order.orderDetailsResponse?.length || 0}
                    </div>
                  </div>
                </div>

                {/* Order details box */}
                {order.orderDetailsResponse && order.orderDetailsResponse.length > 0 && (
                  <div className="rounded-xl bg-slate-50 p-6 mt-8">
                    <div className="text-[11px] font-bold text-gray-500 tracking-wider mb-6 uppercase">
                      Order Details
                    </div>
                    
                    <div className="space-y-6">
                      {order.orderDetailsResponse.map((item, index) => (
                        <div key={item.productId || index} className="flex justify-between items-center text-sm">
                          <div className="flex flex-1 items-center">
                            <span className="text-gray-400 mr-1.5 font-medium">Product</span>
                            <span className="font-semibold text-gray-800 text-left">{item.productName}</span>
                          </div>
                          <div className="w-32 text-center font-medium text-gray-600">
                            Qty {item.orderQty}
                          </div>
                          <div className="w-24 text-right font-semibold text-gray-800">
                            ${(item.orderTotal || 0).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}