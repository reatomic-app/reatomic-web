
import EditProject from "@/reatomic/projects/adapters/views/EditProject.vue";

export default [    
    {
        path: ":id",
        props: true,
        component: EditProject,
    }
];