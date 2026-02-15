'use client'
import { api } from '@/trpc/react'
import { CreditCard } from 'lucide-react'
import React from 'react'

const TransactionHistory = () => {
    const { data: stripeTransactions } = api.project.getStripeTransactions.useQuery()
    if (!stripeTransactions || stripeTransactions.length === 0) return null
    return (
        <div className="glass-card p-6 md:p-8">
            <h1 className='text-lg font-semibold tracking-tight text-zinc-100'>Transaction History</h1>
            {stripeTransactions?.map((transaction) => (
                <div key={transaction.id} className="my-2 flex items-center justify-between rounded-lg border-b border-zinc-800 bg-zinc-900/50 p-4 transition-colors duration-200 hover:bg-zinc-900">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full border border-zinc-800 bg-black/70 p-2">
                            <CreditCard className='size-5 text-zinc-100' />
                        </div>
                        <div>
                            <p className="font-medium text-zinc-100">Credits Added</p>
                            <p className="text-sm text-zinc-400">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="text-md font-semibold text-zinc-100">+{transaction.credits} credits</div>
                </div>
            ))}
        </div>
    )
}

export default TransactionHistory
