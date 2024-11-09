const Membership = require('../model/membership')

exports.createMembership = async (req,res)=>{
    try {
        const new_plan = req.body;

        const existingMembership = await Membership.findOne(new_plan);
        if (existingMembership) return res.status(400).json({ message: "Membership already exists" });

        const newMembership = new Membership(new_plan);
        await newMembership.save();

        res.status(201).json({ Membership: newMembership});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getMembership = async (req,res)=>{
    try {
        const { membershipId } = req.params;

        const getMembership = await Membership.findById(membershipId);
        if (!getMembership) return res.status(404).json({ message: "Membership not found" });

        const plan = getMembership.map(plan => ({
            plan_id: plan._id,
            plan_name: plan.plan_name,
            description: plan.description,
            duration: plan.duration,
            price: plan.price,
            coins: plan.coins,
            userCount: plan.users.length 
        }));

        res.json({ Membership: plan });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


exports.getAllMembership = async (req,res)=>{
    try {
        const getMembership = await Membership.find();
        const plan = getMembership.map(plan => ({
            plan_id: plan._id,
            plan_name: plan.plan_name,
            description: plan.description,
            duration: plan.duration,
            price: plan.price,
            coins: plan.coins,
            userCount: plan.users.length 
        }));

        res.json({ Membership: plan });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateMembership = async (req,res)=>{
    try {
        const { planId } = req.params;
        const updates = req.body;

        const updatedMembership = await Membership.findByIdAndUpdate(planId, updates, { new: true });
        if (!updatedMembership) return res.status(404).json({ message: "Plan not found" });

        res.json({ message: "Membership updated successfully", updatedAuthor });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteMembership = async (req,res)=>{
    try {
        const { planId } = req.params.id;

        const deletedMembership = await Membership.findByIdAndDelete(planId);
        if (!deletedMembership) return res.status(404).json({ message: "Membership not found" });

        res.json({ message: "Membership deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
