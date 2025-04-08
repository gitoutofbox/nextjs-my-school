'use client';
import Button from "@/app/components/Button";
import { API_BASE_MONGO } from "@/config/api-config";
import { useRouter } from "next/navigation";

export default function DeleteStudentBtn({studentId}: {studentId: string}) {
    const router = useRouter();
    function deleteStudent(id: string) {
        confirm("Are you sure you want to delete this student?") && fetch(`${API_BASE_MONGO}/student/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ id }),
        })
            .then((res) => {
                if (res.ok) {
                    router.push('/students');
                } else {
                    alert("Error deleting student");
                }
            }
            )
            .catch((err) => {
                console.error(err);
                alert("Error deleting student");
            }
            );
    }
    return (
        <Button className="text-red-500 hover:text-red-900 bg-white" onClick={() => deleteStudent(studentId)}>
            Delete
        </Button>
    );
}