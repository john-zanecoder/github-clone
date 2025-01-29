'use client'

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PullRequestList = () => {
  const pullRequests = [
    { id: 582, title: "TPOP-11 - Create a separation of API for LConditions", opened: "yesterday", author: "sonrhey" },
    { id: 577, title: "TPOP-2 - Broker Pipelines", opened: "last week", author: "sonrhey" },
    { id: 573, title: "Initial setup", opened: "last week", author: "zane-jason" },
    { id: 545, title: "Fixed morty header", opened: "Dec 26, 2024", author: "kbszanecoder" },
    { id: 544, title: "MTM-20 - MS Teams Call", opened: "Dec 26, 2024", author: "sonrhey" },
    { id: 542, title: "Admin Email Template updates", opened: "Dec 24, 2024", author: "kbszanecoder" },
    { id: 541, title: "122425 - JIRA bug fixes", opened: "Dec 24, 2024", author: "kbszanecoder" },
    { id: 477, title: "Loan Details API", opened: "Nov 12, 2024", author: "sonrhey" },
    { id: 473, title: "Create OC", opened: "Nov 8, 2024", author: "sonrhey" },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <Input placeholder="Search" className="w-1/3" />
        <div className="flex gap-2">
          <Button>New pull request</Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="border-b pb-2 mb-2 flex justify-between">
            <Checkbox />
            <span>13 Open</span>
            <span>569 Closed</span>
          </div>

          <ul className="space-y-4">
            {pullRequests.map((pr) => (
              <li key={pr.id} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span className="font-medium">{pr.title}</span>
                </div>
                <div className="text-sm text-gray-500">
                  #{pr.id} opened {pr.opened} by {pr.author}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PullRequestList;
