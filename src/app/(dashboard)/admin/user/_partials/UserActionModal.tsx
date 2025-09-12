import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AppInputField from "@/components/forms/InputField";
import { useRoleUserForm } from "@/features/userRole/hooks/useUserRoleForm";
import { useRoleUser } from "@/features/userRole/hooks/useUserRole";

export const CreateUserDialog = ({ isOpen, onClose, mutate }) => {
  
  const { addUser , deleteUser } = useRoleUser(mutate)
  const {
    email,
    error,
    handleChange,
    handleSubmit,
    handleCancel,
    isSubmitting
  } = useRoleUserForm(addUser , onClose);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <AppInputField 
              id="email"
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter email address"
              value={email}
              required
              error={error}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!email.trim() || error !== "" || isSubmitting}>
              {
                isSubmitting ? 'Creating User ...' :
                'Create User'
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
