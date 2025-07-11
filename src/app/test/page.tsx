import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TestPage = () => {
  return (
    <div className="grid grid-cols-[auto_3fr_auto] max-w-5xl mx-auto">
      {/* Rotated Vertical Text */}
      <div className="flex justify-center items-center">
        <div className="transform rotate-[-90deg] origin-center">
          <div className="flex justify-between items-center w-64 px-4">
            <div className="text-xs text-gray-500">Low</div>
            <div className="text-sm font-semibold text-gray-600">Domain Expertise</div>
            <div className="text-xs text-gray-500">High</div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              Card Content
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non culpa voluptatum quod inventore nobis quia ullam, necessitatibus voluptatibus eos voluptates cumque, sapiente mollitia. Eaque maxime minima cumque accusamus libero temporibus!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              Card Content
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non culpa voluptatum quod inventore nobis quia ullam, necessitatibus voluptatibus eos voluptates cumque, sapiente mollitia. Eaque maxime minima cumque accusamus libero temporibus!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              Card Content
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non culpa voluptatum quod inventore nobis quia ullam, necessitatibus voluptatibus eos voluptates cumque, sapiente mollitia. Eaque maxime minima cumque accusamus libero temporibus!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              Card Content
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non culpa voluptatum quod inventore nobis quia ullam, necessitatibus voluptatibus eos voluptates cumque, sapiente mollitia. Eaque maxime minima cumque accusamus libero temporibus!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestPage;