import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../../../models/user";

export const signup = async (req: Request, res: Response) => {
  try {
    if (req.session && req.session.userId) {
      return res.redirect("/project");
    }
    let { username, first_name, last_name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!username) username = email;
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      profile_picture: "https://www.gravatar.com/avatar/?d=mp",
    });

    req.flash("success", "Create account successfully !"); // Flash success message
    res.redirect(`/login`);
    
  } catch (error) {
    console.error(error);
    req.flash("error", "Account not valid !"); // Flash error message
    res.redirect("/register");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({
      where: { email },
      plain: true,
    });

    if (!user) {
      req.flash("error", "Email or Password is not correct!");
      return res.redirect(`/login`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Email or Password is not correct!");
      return res.redirect(`/login`);
    }

    req.session.userId = user.id;
    req.session.email = user.username;
    req.session.fullName = user.first_name + " " + user.last_name;
    console.log(req.session.username, req.session.userId);
    res.redirect(`/project`);
  } catch (error) {
    console.error(error);
    req.flash("error", "Server error, please try again later."); // Flash error message
    res.redirect(`/login`);
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out.");
    }
    res.redirect("/login");
  });
};
